import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { logout } from 'store/persist/slice';
import { setSidebar } from 'store/sidebar/slice';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';

export const Logout: FC = () => {
  const dispatch = useDispatch();

  return (
    <SidebarItem
      iconName={'Logout'}
      onClick={(): void => {
        dispatch(logout());
        dispatch(setSidebar(false));
      }}
      size={'large'}
      title={'Sair'}
    />
  );
};
