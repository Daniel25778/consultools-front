import { yupResolver } from '@hookform/resolvers/yup';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { UserRequest } from 'validation/schema';
import { userSchema } from 'validation/schema';

interface useRegisterConsultantProps {
  closeModal: () => void;
}

export const useRegisterConsultant = ({
  closeModal
}: useRegisterConsultantProps): formReturn<UserRequest> => {
  const formData = useForm<UserRequest>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.user
      });
      toast.success('Consultor cadastrado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
