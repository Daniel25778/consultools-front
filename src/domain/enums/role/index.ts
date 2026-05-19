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
