import { Role, Status } from 'domain/enums';
import type { InferType } from 'yup';
import { mixed, object, string } from 'yup';

export const collaboratorSchema = object().shape({
  name: string().required(),
  email: string().required().email(),
  cpf: string().required(),
  role: string()
    .required()
    .oneOf([Role.COLLABORATOR, Role.CONSULTANT, Role.MANAGER], 'Função inválida'),
  companyId: string().required(),
  status: mixed<Status>().oneOf(Object.values(Status), 'Status inválido').required()
});

export type CollaboratorRequest = InferType<typeof collaboratorSchema>;
