import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PrivateHeader } from 'presentation/atomic-component/organism';
import Footer from 'presentation/atomic-component/organism/footer';
import { type FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const MainTemplate: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={'flex flex-col min-h-dvh'} id={'main'}>
        <PrivateHeader />

        <main className={'flex w-full bg-gray-75 dark:bg-gray-900'}>
          <div className={'flex w-full'} style={{ transition: 'all 200ms' }}>
            <div
              className={
                'text-white w-full py-10 min-h-[calc(100dvh-69px)] dark:text-white flex items-start justify-center gap-3 pr-4 pl-4 tablet:px-[150px] tablet:py-14'
              }
            >
              <Outlet />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LocalizationProvider>
  );
};
