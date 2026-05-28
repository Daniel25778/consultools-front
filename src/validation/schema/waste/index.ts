import type { InferType } from 'yup';
import { number, object, string } from 'yup';

export const wasteSchema = object().shape({
  productionReportingId: string().required(),
  quantity: number().required(),
  wasteTypeId: string().required()
});

export type WasteRequest = InferType<typeof wasteSchema>;
