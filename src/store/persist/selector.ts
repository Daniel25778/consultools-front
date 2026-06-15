import type { User } from 'domain/models';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { setSidebarOpen } from './slice';

export const useUserLogged = (): User => {
  const { user } = useAppSelector((state) => state.persist);

  if (user) return user;

  return null as unknown as User;
};

export const useSidebar = (): {
  open: boolean;
  setOpen: (newValue: boolean) => void;
} => {
  const open = useAppSelector((state) => state.persist.sidebarOpen);

  const dispatch = useDispatch();

  const setOpen = (newValue: boolean): void => {
    dispatch(setSidebarOpen(newValue));
  };

  return { open, setOpen };
};
