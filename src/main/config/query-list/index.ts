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
  responsibleArea = 'responsibleArea',
  product = 'product',
  user = 'user',
  company = 'company',
  collaborator = 'collaborator'
}
