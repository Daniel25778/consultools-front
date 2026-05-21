import { paths } from 'main/config';

export enum Role {
  ADMIN = 'ADMIN',
  COLABORATOR = 'COLABORATOR',
  CONSULTANT = 'CONSULTANT'
}

export const roleTranslate: Record<Role, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.COLABORATOR]: 'Colaborador',
  [Role.CONSULTANT]: 'Consultor'
};

export const roleRoutes = {
  [Role.ADMIN]: paths.consultant,
  [Role.CONSULTANT]: paths.company,
  [Role.COLABORATOR]: paths.notation
};
