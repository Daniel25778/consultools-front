import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const PublicTemplate: FC = () => {
  return (
    <main
      className={'flex flex-col h-screen justify-center bg-gray-50 dark:bg-gray-900 p-8'}
      id={'main'}
    >
      <Outlet />
    </main>
  );
};
