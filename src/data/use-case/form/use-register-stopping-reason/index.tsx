import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { StoppingReason } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, QueryName } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { stoppingReasonSchema, type StoppingReasonRequest } from 'validation/schema';

interface useRegisterStoppingReasonProps {
  closeModal: () => void;
  stoppingReason?: StoppingReason;
}

export const useRegisterStoppingReason = ({
  closeModal,
  stoppingReason
}: useRegisterStoppingReasonProps): formReturn<StoppingReasonRequest> => {
  const formData = useForm<StoppingReasonRequest>({
    resolver: yupResolver(stoppingReasonSchema),
    defaultValues: (stoppingReason as StoppingReason) ?? {
      status: Status.ENABLED,
      name: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<StoppingReasonRequest> = async (data) => {
    try {
      if (stoppingReason)
        await api.put({
          body: data,
          id: stoppingReason.id,
          route: apiPaths.stoppingReason
        });
      else
        await api.post({
          body: data,
          route: apiPaths.stoppingReason
        });
      callToast.success(
        `Motivo de parada ${stoppingReason ? 'editado' : 'cadastrado'} com sucesso!`
      );
      queryClient.invalidateQueries({ queryKey: [QueryName.stoppingReason] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
