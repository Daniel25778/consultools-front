import type { InferType } from 'yup';
import { object, string } from 'yup';

export const requestCodeSchema = object().shape({
  email: string().email('Digite um email válido').required('Email é obrigatório')
});

export type RequestCodeRequest = InferType<typeof requestCodeSchema>;
