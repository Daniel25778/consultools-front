import { yupResolver } from '@hookform/resolvers/yup';
import type { Waste } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { wasteSchema, type WasteRequest } from 'validation/schema';

interface useRegisterWasteProps {
  closeModal: () => void;
  waste?: Waste;
}

export const useRegisterWaste = ({
  closeModal,
  waste
}: useRegisterWasteProps): formReturn<WasteRequest> => {
  const formData = useForm<WasteRequest>({
    resolver: yupResolver(wasteSchema)
  });

  const onSubmit: SubmitHandler<WasteRequest> = async (data) => {
    try {
      if (waste)
        await api.put({
          body: data,
          id: waste.id,
          route: apiPaths.waste
        });
      else
        await api.post({
          body: data,
          route: apiPaths.waste
        });
      callToast.success(`Refugo ${waste ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['waste'] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
