import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { ResponsibleArea } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, QueryName } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  responsibleAreaSchema,
  type ResponsibleAreaRequest
} from 'validation/schema/responsible-area';

interface useRegisterResponsibleAreaProps {
  closeModal: () => void;
  responsibleArea?: ResponsibleArea;
}

export const useRegisterResponsibleArea = ({
  closeModal,
  responsibleArea
}: useRegisterResponsibleAreaProps): formReturn<ResponsibleAreaRequest> => {
  const formData = useForm<ResponsibleAreaRequest>({
    resolver: yupResolver(responsibleAreaSchema),
    defaultValues: (responsibleArea as ResponsibleArea) ?? {
      status: Status.ENABLED,
      name: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<ResponsibleAreaRequest> = async (data) => {
    try {
      if (responsibleArea)
        await api.put({
          body: data,
          id: responsibleArea.id,
          route: apiPaths.responsibleArea
        });
      else
        await api.post({
          body: data,
          route: apiPaths.responsibleArea
        });
      callToast.success(
        `Área responsável ${responsibleArea ? 'editado' : 'cadastrado'} com sucesso!`
      );
      queryClient.invalidateQueries({ queryKey: [QueryName.responsibleArea] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
