import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginPayload, User } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { apiPaths, paths } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { setAuth } from 'store/persist/slice';
import type { LoginRequest } from 'validation/schema';
import { loginSchema } from 'validation/schema';

export const useUserLogin = (): formReturn<LoginRequest> => {
  const formData = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const { redirectPath } = useAppSelector((state) => state.persist);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const { access_token } = await api.post<LoginPayload>({
        body: data,
        route: apiPaths.login,
      });

      const user = await api.get<User>({
        id: 'me',
        route: apiPaths.user,
        token: access_token,
      });

      dispatch(setAuth({ token: access_token, user }));
      navigate(redirectPath ?? paths.home);
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
