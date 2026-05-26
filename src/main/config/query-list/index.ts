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
  | 'productionReport'
  | 'shift'
  | 'measurementUnit';

export enum QueryName {
  default = 'default',
  measurementUnit = 'measurement-unit',
  productionReport = 'production-report',
  wasteType = 'waste-type',
  workstation = 'workstation',
  shift = 'shift',
  stoppingReason = 'stopping-reason',
  responsibleArea = 'responsibleArea',
  product = 'product',
  user = 'user',
  company = 'company',
  collaborator = 'collaborator'
}
