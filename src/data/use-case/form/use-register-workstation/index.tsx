import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { Workstation } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { workstationSchema, type WorkstationRequest } from 'validation/schema/workstation';

interface useRegisterWorkstationProps {
  closeModal: () => void;
  workstation?: Workstation;
}

export const useRegisterWorkstation = ({
  closeModal,
  workstation
}: useRegisterWorkstationProps): formReturn<WorkstationRequest> => {
  const formData = useForm<WorkstationRequest>({
    resolver: yupResolver(workstationSchema),
    defaultValues: (workstation as Workstation) ?? {
      status: Status.ENABLED,
      name: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<WorkstationRequest> = async (data) => {
    try {
      if (workstation)
        await api.put({
          body: data,
          id: workstation.id,
          route: apiPaths.workstation
        });
      else
        await api.post({
          body: data,
          route: apiPaths.workstation
        });
      callToast.success(`Posto de trabalho ${workstation ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['workstation'] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
