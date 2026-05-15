import { yupResolver } from '@hookform/resolvers/yup';
import { useBack } from 'data/hooks';
import type { User } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { QueryName, apiPaths, paths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { UserRequest } from 'validation/schema';
import { userSchema } from 'validation/schema';

interface useUserProps {
  user?: User;
}

export const useUser = ({ user }: useUserProps): formReturn<UserRequest> => {
  const formData = useForm<UserRequest>({
    resolver: yupResolver(userSchema),
  });

  const { navigate } = useBack();

  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      if (user)
        await api.put({ body: data, id: user.id, route: apiPaths.user });
      else await api.post({ body: data, route: apiPaths.user });

      callToast.success(`${user ? 'Atualizado' : 'Cadastrado'} com sucesso`);
      queryClient.invalidateQueries({ queryKey: [QueryName.user] });

      navigate(paths.login);
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
