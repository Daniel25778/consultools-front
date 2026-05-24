import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { Collaborator } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { collaboratorSchema, type CollaboratorRequest } from 'validation/schema/collaborator';

interface useRegisterCollaboratorProps {
  closeModal: () => void;
  collaborator?: Collaborator;
}

export const useRegisterCollaborator = ({
  closeModal,
  collaborator
}: useRegisterCollaboratorProps): formReturn<CollaboratorRequest> => {
  const formData = useForm<CollaboratorRequest>({
    resolver: yupResolver(collaboratorSchema),
    defaultValues: (collaborator as Collaborator) ?? {
      status: Status.ENABLED,
      name: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<CollaboratorRequest> = async (data) => {
    try {
      if (collaborator)
        await api.put({
          body: data,
          id: collaborator.id,
          route: apiPaths.collaborator
        });
      else
        await api.post({
          body: data,
          route: apiPaths.collaborator
        });
      toast.success(`Colaborador ${collaborator ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['collaborator'] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
