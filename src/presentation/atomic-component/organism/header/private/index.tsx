import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ToggleMenu, ToggleTheme } from 'presentation/atomic-component/atom';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { logout } from 'store/persist/slice';
import { setSidebar } from 'store/sidebar/slice';

export const PrivateHeader: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const dispatch = useDispatch();

  return (
    <header
      className={
        'flex justify-between items-center p-4 border-b z-[9999] bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600 sticky top-0 h-[70px] header'
      }
    >
      <div className={'flex gap-3'}>
        <ToggleMenu />
      </div>

      <div className={'flex items-center gap-6'}>
        <ToggleTheme />
        <div className={'text-primary dark:text-white flex items-center gap-1'}>
          <p className={'font-semibold dark:font-bold'}>Olá, {user.username} </p>

          <IconButton
            onClick={(): void => {
              dispatch(logout());
              dispatch(setSidebar(false));
            }}
            color={'inherit'}
          >
            <Logout color={'inherit'} fontSize={'small'} />
          </IconButton>
        </div>
      </div>
    </header>
  );
};
