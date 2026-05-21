import { Status } from 'domain/enums';
import * as yup from 'yup';

export const companySchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  cnpj: yup.string().required('CNPJ é obrigatório'),
  status: yup.mixed<Status>().oneOf(Object.values(Status)).required('Status é obrigatório')
});

export type CompanyRequest = yup.InferType<typeof companySchema>;
