import { paths } from 'main/config';

export enum Role {
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
  CONSULTANT = 'CONSULTANT',
  MANAGER = 'MANAGER'
}

export const roleTranslate: Record<Role, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.COLLABORATOR]: 'Colaborador',
  [Role.CONSULTANT]: 'Consultor',
  [Role.MANAGER]: 'Gerente'
};

export const roleRoutes = {
  [Role.ADMIN]: paths.consultant,
  [Role.CONSULTANT]: paths.company,
  [Role.COLLABORATOR]: paths.productionReport,
  [Role.MANAGER]: paths.companyDetails('redirect')
};
