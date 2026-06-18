import type { InferType } from 'yup';
import { number, object, string } from 'yup';

const baseSchema = object().shape({
  startDate: string().required(),
  endDate: string().required(),
  production: number().required(),
  companyId: string().required(),
  productId: string().required(),
  shiftId: string().required(),
  workstationId: string().required()
});

export const productionReportSchema = baseSchema.shape({
  collaboratorId: string().optional()
});

export const productionReportSchemaWithCollaborator = baseSchema.shape({
  collaboratorId: string().required()
});

export type ProductionReportRequest = InferType<typeof productionReportSchema> & {
  collaboratorId?: string;
};
