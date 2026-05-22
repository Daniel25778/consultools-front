import { Button } from '@mui/material';
import { routePaths } from 'main/config';
import { PrivateRoute, PublicRoute } from 'main/proxies';
import { MainTemplate, PublicTemplate } from 'presentation/atomic-component/template';
import {
  AuthContent,
  ChangePasswordContent,
  ConsultantContent,
  EnterCodeContent,
  RequestCodeContent
} from 'presentation/environment';
import { CompanyContentDetails } from 'presentation/environment/company';
import { CompanyContent } from 'presentation/environment/company/content';
import { ConsultantContentDetails } from 'presentation/environment/consultant';
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
            <Route element={<RequestCodeContent />} path={routePaths.requestCode} />
            <Route element={<EnterCodeContent />} path={routePaths.enterCode} />
            <Route element={<ChangePasswordContent />} path={routePaths.changePassword} />
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<ConsultantContent />} path={routePaths.consultant} />
            <Route element={<ConsultantContentDetails />} path={routePaths.consultantDetails} />
            <Route element={<CompanyContent />} path={routePaths.company} />
            <Route element={<CompanyContentDetails />} path={routePaths.companyDetails} />
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
