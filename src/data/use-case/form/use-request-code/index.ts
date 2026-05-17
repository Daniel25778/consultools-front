import { yupResolver } from '@hookform/resolvers/yup';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { apiPaths, routePaths } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRecoveryData } from 'store/recovery/slice';
import type { RequestCodeRequest } from 'validation/schema';
import { requestCodeSchema } from 'validation/schema';

export const useRequestCode = (): formReturn<RequestCodeRequest> => {
  const formData = useForm<RequestCodeRequest>({
    resolver: yupResolver(requestCodeSchema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<RequestCodeRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.requestCode
      });
      dispatch(setRecoveryData({ email: data.email }));
      navigate(routePaths.enterCode);
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
