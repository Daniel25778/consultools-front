import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'store/persist/slice';

export const Logout: FC = () => {
  const dispatch = useDispatch();

  return (
    <SidebarItem
      iconName={'Logout'}
      onClick={(): void => {
        dispatch(logout());
      }}
      size={'small'}
      title={'Sair'}
    />
  );
};
