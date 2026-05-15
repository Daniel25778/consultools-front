import { PrivateHeader, Sidebar } from 'presentation/atomic-component/organism';
import { type FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const MainTemplate: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={'flex flex-col min-h-dvh'} id={'main'}>
      <PrivateHeader />

      <main className={'flex w-full bg-gray-75 dark:bg-gray-900'}>
        <Sidebar />

        <div
          className={'flex w-full laptop:ml-[80px] laptop:px-4'}
          style={{ transition: 'all 200ms' }}
        >
          <div
            className={
              'flex flex-col w-full mx-auto min-h-[calc(100dvh-69px)] max-w-[1400px] p-4 laptop:px-0 tablet:py-8'
            }
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
