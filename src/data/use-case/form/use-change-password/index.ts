import { yupResolver } from '@hookform/resolvers/yup';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { apiPaths, routePaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  changePasswordSchema,
  type ChangePasswordRequest
} from 'validation/schema/change-password';

export const useChangePassword = (preset?: {
  email?: string;
  code?: string;
}): formReturn<ChangePasswordRequest> => {
  const formData = useForm<ChangePasswordRequest>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      email: preset?.email ?? undefined,
      code: preset?.code ?? undefined,
      newPassword: undefined
    }
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ChangePasswordRequest> = async (data) => {
    try {
      await api.patch({
        body: data,
        route: apiPaths.changePassword
      });
      callToast.success('Senha alterada com sucesso');
      navigate(routePaths.login);
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
