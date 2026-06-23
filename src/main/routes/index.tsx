import { Role } from 'domain/enums';
import { routePaths } from 'main/config';
import { CheckRole, HomeRoute, NotFound, PrivateRoute, PublicRoute } from 'main/proxies';
import { MainTemplate, PublicTemplate } from 'presentation/atomic-component/template';
import {
  AuthContent,
  ChangePasswordContent,
  ConsultantContent,
  EnterCodeContent,
  PrivacyPolicyContent,
  ProductContent,
  ProductionReportContent,
  ProductionReportDetails,
  RequestCodeContent,
  ResponsibleAreaContent,
  ShiftContent,
  StoppingContent,
  StoppingReasonContent,
  TermsOfUseContent
} from 'presentation/environment';
import { CollaboratorContent } from 'presentation/environment/collaborator';
import { CompanyDetails } from 'presentation/environment/company';
import { CompanyContent } from 'presentation/environment/company/content';
import { ConsultantDetails } from 'presentation/environment/consultant';
import { WasteContent } from 'presentation/environment/waste';
import { WasteTypeContent } from 'presentation/environment/waste-type';
import { WorkstationContent } from 'presentation/environment/workstation';
import type { FC } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Outlet />}>
      <Routes>
        <Route element={<HomeRoute />} path={routePaths.home} />
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicTemplate />}>
            <Route element={<AuthContent />} path={routePaths.login} />
            <Route element={<RequestCodeContent />} path={routePaths.requestCode} />
            <Route element={<EnterCodeContent />} path={routePaths.enterCode} />
            <Route element={<ChangePasswordContent />} path={routePaths.changePassword} />
            <Route element={<TermsOfUseContent />} path={routePaths.termsOfUse} />
            <Route element={<PrivacyPolicyContent />} path={routePaths.privacyPolicy} />
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<CheckRole roles={[Role.ADMIN]} />}>
              <Route element={<ConsultantContent />} path={routePaths.consultant} />
              <Route element={<ConsultantDetails />} path={routePaths.consultantDetails} />
            </Route>

            <Route element={<CheckRole roles={[Role.CONSULTANT]} />}>
              <Route element={<CompanyContent />} path={routePaths.company} />
            </Route>

            <Route element={<CheckRole roles={[Role.CONSULTANT, Role.MANAGER]} />}>
              <Route element={<CompanyDetails />} path={routePaths.companyDetails} />
              <Route
                element={<ProductionReportContent />}
                path={routePaths.productionReportCompany}
              />
              <Route element={<StoppingContent />} path={routePaths.stoppingCompany} />

              <Route element={<WasteContent />} path={routePaths.wasteCompany} />

              <Route element={<WorkstationContent />} path={routePaths.workstation} />
              <Route element={<WasteTypeContent />} path={routePaths.wasteType} />
              <Route element={<CollaboratorContent />} path={routePaths.collaborator} />
              <Route element={<ProductContent />} path={routePaths.product} />
              <Route element={<ShiftContent />} path={routePaths.shift} />
              <Route element={<StoppingReasonContent />} path={routePaths.stoppingReason} />
              <Route element={<ResponsibleAreaContent />} path={routePaths.responsibleArea} />
              <Route
                element={<ProductionReportDetails />}
                path={routePaths.productionReportDetailsCompany}
              />
            </Route>

            <Route element={<CheckRole roles={[Role.COLLABORATOR]} />}>
              <Route element={<ProductionReportContent />} path={routePaths.productionReport} />
              <Route element={<StoppingContent />} path={routePaths.stopping} />
              <Route element={<WasteContent />} path={routePaths.waste} />
              <Route
                element={<ProductionReportDetails />}
                path={routePaths.productionReportDetails}
              />
            </Route>
            {/*  */}
            {/*  */}
          </Route>
        </Route>

        <Route>
          <Route element={<NotFound />} path={'*'} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RouterConfig;
