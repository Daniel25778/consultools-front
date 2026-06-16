import { yupResolver } from '@hookform/resolvers/yup';
import type { Stopping } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, QueryName } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { stoppingSchema, type StoppingRequest } from 'validation/schema';

interface useRegisterStoppingProps {
  closeModal: () => void;
  stopping?: Stopping;
}

export const useRegisterStopping = ({
  closeModal,
  stopping
}: useRegisterStoppingProps): formReturn<StoppingRequest> => {
  const formData = useForm<StoppingRequest>({
    resolver: yupResolver(stoppingSchema)
  });

  const onSubmit: SubmitHandler<StoppingRequest> = async (data) => {
    try {
      if (stopping)
        await api.put({
          body: data,
          id: stopping.id,
          route: apiPaths.stopping
        });
      else
        await api.post({
          body: data,
          route: apiPaths.stopping
        });
      callToast.success(`Parada ${stopping ? 'editado' : 'cadastrada'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: [QueryName.stopping] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
