import { yupResolver } from '@hookform/resolvers/yup';
import { roleRoutes } from 'domain/enums';
import type { LoginPayload } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from 'store/persist/slice';
import type { LoginRequest } from 'validation/schema';
import { loginSchema } from 'validation/schema';

export const useUserLogin = (): formReturn<LoginRequest> => {
  const formData = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await api.post<LoginPayload>({
        body: data,
        route: apiPaths.login
      });

      dispatch(
        setAuth({
          token: response.accessToken,
          user: response.user
        })
      );
      navigate(roleRoutes[response.user.role]);
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
