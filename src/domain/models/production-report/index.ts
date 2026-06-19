import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';
import type { Collaborator } from '../collaborator';
import type { Company } from '../company';
import type { Product } from '../product';
import type { Shift } from '../shift';
import type { Workstation } from '../workstation';

export interface FindProductionReportQuery extends Pagination {
  content: ProductionReport[];
}

export interface ProductionReportDetails {
  id: string;
  date: string;
  startDate: string;
  endDate: string;
  finished: boolean;
  production: number;
  workstation: Workstation;
  product: Product;
  shift: Shift;
  collaborator: Collaborator;
  company: Company;
  createdAt: string;
  updatedAt: string;
  code: string;
  finishedAt: boolean | null;
}

export interface ProductionReport {
  id: string;
  date: string;
  startDate: string;
  endDate: string;
  code: string;
  finishedAt: Date | null;
  production: number;
  workstation: string;
  productId: string;
  shiftId: string;
  collaboratorId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProductionReportFilter extends FilterPagination, FilterSort {
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const finishedOptions = [
  { label: 'Finalizado', value: 'true' },
  { label: 'Não finalizado', value: 'false' }
];

export const productionReportFilterInitialState: ProductionReportFilter = {
  endDate: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
