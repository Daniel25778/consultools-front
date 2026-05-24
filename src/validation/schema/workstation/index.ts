import { Status } from 'domain/enums';
import type { InferType } from 'yup';
import { mixed, object, string } from 'yup';

export const workstationSchema = object().shape({
  name: string().required(),
  description: string().required(),
  companyId: string().required(),
  status: mixed<Status>().oneOf(Object.values(Status), 'Status inválido').required()
});

export type WorkstationRequest = InferType<typeof workstationSchema>;
