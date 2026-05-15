import { Button } from '@mui/material';
import { routePaths } from 'main/config';
import { PrivateRoute, PublicRoute } from 'main/proxies';
import {
  MainTemplate,
  PublicTemplate,
} from 'presentation/atomic-component/template';
import {
  AuthContent,
  DetectionContent,
  DetectionDetailContent,
  HomeContent,
  ProfileContent,
  RegisterContent,
  YoloContent,
  YoloDetailContent,
} from 'presentation/environment';
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
            <Route element={<RegisterContent />} path={routePaths.register} />
          </Route>
        </Route>

        {/* Restaurant Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<HomeContent />} path={routePaths.home} />
            {/*  */}
            {/*  */}
            <Route element={<ProfileContent />} path={routePaths.profile} />
            {/*  */}
            {/*  */}
            <Route element={<DetectionContent />} path={routePaths.detection} />
            <Route
              element={<DetectionDetailContent />}
              path={routePaths.detectionDetail}
            />
            {/*  */}
            {/*  */}
            <Route element={<YoloContent />} path={routePaths.yolo} />
            <Route
              element={<YoloDetailContent />}
              path={routePaths.yoloDetail}
            />
          </Route>
        </Route>

        <Route>
          <Route
            element={
              <div
                className={
                  'flex flex-col gap-2 items-center justify-center w-full h-screen'
                }
              >
                Página não encontrada
                <Button onClick={(): void => window.history.back()}>
                  Voltar
                </Button>
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
