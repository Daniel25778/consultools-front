import { yupResolver } from '@hookform/resolvers/yup';
import type { formReturn } from 'domain/protocol';
import { routePaths } from 'main/config';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRecoveryData } from 'store/recovery/slice';
import type { VerifyCodeRequest } from 'validation/schema';
import { verifyCodeSchema } from 'validation/schema';

export const useVerifyCode = (): formReturn<VerifyCodeRequest> => {
  const formData = useForm<VerifyCodeRequest>({
    resolver: yupResolver(verifyCodeSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<VerifyCodeRequest> = async (data) => {
    dispatch(setRecoveryData({ code: data.code }));
    navigate(routePaths.changePassword);
  };

  return { ...formData, onSubmit };
};
