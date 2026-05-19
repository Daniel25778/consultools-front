import type { InferType } from 'yup';
import { object, string } from 'yup';

export const userSchema = object().shape({
  name: string().required(),
  email: string().required().email(),
  cpf: string().required()
});

export type UserRequest = InferType<typeof userSchema>;
