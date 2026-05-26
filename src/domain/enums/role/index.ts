import { paths } from 'main/config';

export enum Role {
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
  CONSULTANT = 'CONSULTANT'
}

export const roleTranslate: Record<Role, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.COLLABORATOR]: 'Colaborador',
  [Role.CONSULTANT]: 'Consultor'
};

export const roleRoutes = {
  [Role.ADMIN]: paths.consultant,
  [Role.CONSULTANT]: paths.company,
  [Role.COLLABORATOR]: paths.productionReport
};
