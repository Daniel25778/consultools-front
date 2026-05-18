import { yupResolver } from '@hookform/resolvers/yup';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { apiPaths, routePaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { clearCodeRecovery, setRecoveryData } from 'store/recovery/slice';
import type { RequestCodeRequest } from 'validation/schema';
import { requestCodeSchema } from 'validation/schema';

export const useRequestCode = (): formReturn<RequestCodeRequest> & {
  resendRequestCode: () => Promise<void>;
  isResending: boolean;
} => {
  const [isResending, setIsResending] = useState(false);
  const formData = useForm<RequestCodeRequest>({
    resolver: yupResolver(requestCodeSchema)
  });

  const recoveryEmail = useAppSelector((state) => state.recovery.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<RequestCodeRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.requestCode
      });
      dispatch(setRecoveryData({ email: data.email }));
      dispatch(clearCodeRecovery());
      navigate(routePaths.enterCode);
    } catch (error) {
      resolverError(error);
    }
  };

  const resendRequestCode = async (): Promise<void> => {
    setIsResending(true);
    try {
      await api.post({
        body: { email: recoveryEmail },
        route: apiPaths.requestCode
      });
      dispatch(setRecoveryData({ email: recoveryEmail }));
      callToast.success('Código reenviado com sucesso!');
    } catch (error) {
      resolverError(error);
    } finally {
      setIsResending(false);
    }
  };

  return { ...formData, onSubmit, resendRequestCode, isResending };
};
