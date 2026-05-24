import { Status } from 'domain/enums';
import * as yup from 'yup';

export const wasteTypeSchema = yup.object().shape({
  code: yup.string().required('O código é obrigatório'),
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  companyId: yup.string().required(),
  status: yup.mixed<Status>().oneOf(Object.values(Status), 'Status inválido').required()
});

export type WasteTypeRequest = yup.InferType<typeof wasteTypeSchema>;
