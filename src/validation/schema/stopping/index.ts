import type { InferType } from 'yup';
import { object, string } from 'yup';

export const stoppingSchema = object().shape({
  startDate: string().required(),
  endDate: string().required(),
  stoppingReasonId: string().required(),
  productionReportingId: string().required()
});

export type StoppingRequest = InferType<typeof stoppingSchema>;
