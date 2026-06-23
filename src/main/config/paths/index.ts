export enum routePaths {
  login = '/',
  home = '/home',
  requestCode = '/solicitar-codigo',
  enterCode = '/inserir-codigo',
  changePassword = '/alterar-senha',
  termsOfUse = '/termos-de-uso',
  privacyPolicy = '/politica-de-privacidade',

  // ADMIN
  consultant = '/consultores',
  consultantDetails = '/consultores/:id',

  // CONSULTANT
  company = '/empresas',

  // CONSULTANT | MANAGER
  companyDetails = '/empresas/:companyId',
  stoppingCompany = '/empresas/:companyId/apontamento/:id/paradas',
  wasteCompany = '/empresas/:companyId/apontamento/:id/refugos',
  stoppingReason = '/empresas/:companyId/motivos-de-parada',
  responsibleArea = '/empresas/:companyId/areas-responsaveis',
  workstation = '/empresas/:companyId/postos-de-trabalho',
  collaborator = '/empresas/:companyId/colaborador',
  product = '/empresas/:companyId/produto',
  productionReportCompany = '/empresas/:companyId/apontamento',
  productionReportDetailsCompany = '/empresas/:companyId/apontamento/:id',
  wasteType = '/empresas/:companyId/tipos-de-refugo',
  shift = '/empresas/:companyId/turno',

  // COLLABORATOR
  productionReport = '/apontamento',
  productionReportDetails = '/apontamento/:id',
  stopping = '/apontamento/:id/paradas',
  waste = '/apontamento/:id/refugos'
}

export const paths = {
  login: '/',
  privacyPolicy: '/politica-de-privacidade',
  termsOfUse: '/termos-de-uso',
  requestCode: '/solicitar-codigo',
  enterCode: '/inserir-codigo',
  changePassword: '/alterar-senha',
  consultant: '/consultores',
  consultantDetails: (id: number | string): string => `/consultores/${id}`,
  companyDetails: (id: number | string): string => `/empresas/${id}`,
  productionReportDetails: (id: number | string): string => `/apontamento/${id}`,
  productionReportCompany: (id: number | string): string => `/empresas/${id}/apontamento`,
  productionReportDetailsCompany: (id: number | string, companyId: number | string): string =>
    `/empresas/${companyId}/apontamento/${id}`,
  stopping: (id: number | string): string => `/apontamento/${id}/paradas`,
  stoppingCompany: (id: number | string, companyId: number | string): string =>
    `/empresas/${companyId}/apontamento/${id}/paradas`,
  waste: (id: number | string): string => `/apontamento/${id}/refugos`,
  wasteCompany: (id: number | string, companyId: number | string): string =>
    `/empresas/${companyId}/apontamento/${id}/refugos`,
  workstation: (id: number | string): string => `/empresas/${id}/postos-de-trabalho`,
  wasteType: (id: number | string): string => `/empresas/${id}/tipos-de-refugo`,
  collaborator: (id: number | string): string => `/empresas/${id}/colaborador`,
  product: (id: number | string): string => `/empresas/${id}/produto`,
  shift: (id: number | string): string => `/empresas/${id}/turno`,
  responsibleArea: (id: number | string): string => `/empresas/${id}/areas-responsaveis`,
  stoppingReason: (id: number | string): string => `/empresas/${id}/motivos-de-parada`,
  productionReport: '/apontamento',
  company: '/empresas',
  home: '/home'
};

export const apiPaths = {
  default: '/default',
  login: '/login',
  workstation: '/workstation',
  stopping: '/stopping',
  waste: '/waste',
  productionReport: '/production-reporting',
  shift: '/shift',
  stoppingReason: '/stopping-reason',
  responsibleArea: '/responsible-area',
  measurementUnit: '/measurement-unit',
  product: '/product',
  collaborator: '/collaborator',
  wasteType: '/waste-type',
  company: '/company',
  user: '/user',
  requestCode: '/request-code',
  verifyCode: '/verify-code',
  changePassword: '/change-password',
  dashboard: '/dashboard',
  dashboardTypes: '/dashboard/types'
};
