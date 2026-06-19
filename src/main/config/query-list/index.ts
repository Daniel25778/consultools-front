export type QueryList =
  | 'default'
  | 'user'
  | 'company'
  | 'collaborator'
  | 'wasteType'
  | 'product'
  | 'workstation'
  | 'responsibleArea'
  | 'stoppingReason'
  | 'stopping'
  | 'waste'
  | 'productionReport'
  | 'dashboardTypes'
  | 'dashboard'
  | 'shift'
  | 'measurementUnit';

export enum QueryName {
  default = 'default',
  measurementUnit = 'measurementUnit',
  productionReport = 'productionReport',
  wasteType = 'wasteType',
  workstation = 'workstation',
  stopping = 'stopping',
  shift = 'shift',
  stoppingReason = 'stoppingReason',
  waste = 'waste',
  dashboardTypes = 'dashboardTypes',
  dashboard = 'dashboard',
  responsibleArea = 'responsibleArea',
  product = 'product',
  user = 'user',
  company = 'company',
  collaborator = 'collaborator'
}
