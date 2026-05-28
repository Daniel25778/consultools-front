import type { Role } from 'domain/enums';
import { store } from 'store/index';

export const inRole = (roles: Role[]): boolean => {
  const { role } = store.getState().persist.user;

  return roles?.includes(role);
};

export const notInRole = (roles: Role[]): boolean => {
  const { role } = store.getState().persist.user;

  return !roles?.includes(role);
};
