import { Button } from '@mui/material';
import { routePaths } from 'main/config';
import { PrivateRoute, PublicRoute } from 'main/proxies';
import { MainTemplate, PublicTemplate } from 'presentation/atomic-component/template';
import { AuthContent, HomeContent } from 'presentation/environment';
import type { FC } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Outlet />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicTemplate />}>
            <Route element={<AuthContent />} path={routePaths.login} />
          </Route>
        </Route>

        {/* Restaurant Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<HomeContent />} path={routePaths.home} />
            {/*  */}
            {/*  */}
          </Route>
        </Route>

        <Route>
          <Route
            element={
              <div className={'flex flex-col gap-2 items-center justify-center w-full h-screen'}>
                Página não encontrada
                <Button onClick={(): void => window.history.back()}>Voltar</Button>
              </div>
            }
            path={'*'}
          />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RouterConfig;
