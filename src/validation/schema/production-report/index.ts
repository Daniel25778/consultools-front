import type { InferType } from 'yup';
import { number, object, string } from 'yup';

export const productionReportSchema = object().shape({
  startTime: string().required(),
  endTime: string().required(),
  production: number().required(),
  companyId: string().required(),
  productId: string().required(),
  shiftId: string().required(),
  workstationId: string().required()
});

export type ProductionReportRequest = InferType<typeof productionReportSchema>;
