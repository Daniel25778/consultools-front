import type { InferType } from 'yup';
import { object, string } from 'yup';

export const verifyCodeSchema = object().shape({
  code: string().required('Código é obrigatório').min(4, 'Código inválido')
});

export type VerifyCodeRequest = InferType<typeof verifyCodeSchema>;
