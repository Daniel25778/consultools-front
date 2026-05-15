import type { InferType } from 'yup';
import { object, string } from 'yup';

export const userSchema = object().shape({
  username: string().required(),
  password: string().required()
});

export type UserRequest = InferType<typeof userSchema>;
