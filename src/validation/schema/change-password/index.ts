import type { InferType } from 'yup';
import { object, string } from 'yup';

export const changePasswordSchema = object().shape({
  email: string().email('Digite um email válido').required('Email é obrigatório'),
  code: string().required('Código é obrigatório'),
  newPassword: string().required('Senha é obrigatória')
});

export type ChangePasswordRequest = InferType<typeof changePasswordSchema>;
