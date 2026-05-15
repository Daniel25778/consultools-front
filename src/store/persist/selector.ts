import type { User } from 'domain/models';
import { store } from 'store/index';

export const getUser = (): User => {
  const { user } = store.getState().persist;

  if (user) return user;

  return null as unknown as User;
};
