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
  measurementUnit = 'measurement-unit',
  productionReport = 'production-report',
  wasteType = 'waste-type',
  workstation = 'workstation',
  stopping = 'stopping',
  shift = 'shift',
  stoppingReason = 'stopping-reason',
  waste = 'waste',
  responsibleArea = 'responsibleArea',
  product = 'product',
  user = 'user',
  company = 'company',
  collaborator = 'collaborator'
}
