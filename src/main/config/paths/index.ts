export enum routePaths {
  login = '/',
  consultant = '/consultor',
  consultantDetails = '/consultor/:id',
  companyDetails = '/empresa/:id',
  company = '/empresa',
  notation = '/apontamento',
  requestCode = '/solicitar-codigo',
  enterCode = '/inserir-codigo',
  changePassword = '/alterar-senha'
}

export const paths = {
  login: '/',
  consultant: '/consultor',
  consultantDetails: (id: number | string): string => `/consultor/${id}`,
  companyDetails: (id: number | string): string => `/empresa/${id}`,
  company: '/empresa',
  notation: '/apontamento',
  requestCode: '/solicitar-codigo',
  enterCode: '/inserir-codigo',
  changePassword: '/alterar-senha'
};

export const apiPaths = {
  default: '/default',
  login: '/login',
  workstation: '/workstation',
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
  changePassword: '/change-password'
};
