import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { WasteType } from 'domain/models/waste-type';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, QueryName } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { wasteTypeSchema, type WasteTypeRequest } from 'validation/schema/waste-type';

interface useRegisterWasteTypeProps {
  closeModal: () => void;
  wasteType?: WasteType;
}

export const useRegisterWasteType = ({
  closeModal,
  wasteType
}: useRegisterWasteTypeProps): formReturn<WasteTypeRequest> => {
  const formData = useForm<WasteTypeRequest>({
    resolver: yupResolver(wasteTypeSchema),
    defaultValues: {
      status: Status.ENABLED
    }
  });

  const onSubmit: SubmitHandler<WasteTypeRequest> = async (data) => {
    try {
      if (wasteType)
        await api.put({
          body: data,
          id: wasteType.id,
          route: apiPaths.wasteType
        });
      else
        await api.post({
          body: data,
          route: apiPaths.wasteType
        });
      callToast.success(`Tipo de refugo ${wasteType ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: [QueryName.wasteType] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
