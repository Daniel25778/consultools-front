import { Status } from 'domain/enums';
import type { InferType } from 'yup';
import { mixed, object, string } from 'yup';

export const shiftSchema = object().shape({
  name: string().required(),
  startTime: string().required(),
  endTime: string().required(),
  companyId: string().required(),
  status: mixed<Status>().oneOf(Object.values(Status), 'Status inválido').required()
});

export type ShiftRequest = InferType<typeof shiftSchema>;
