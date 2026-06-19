import type { Nature } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';
import type { StoppingReason } from '../stopping-reason';

export interface FindStoppingQuery extends Pagination {
  content: Stopping[];
}
export interface Stopping {
  id: string;
  stoppingReason: StoppingReason;
  createdAt: string;
  updatedAt: string;
  endDate: string;
  startDate: string;
  productionReportingId: string;
  stoppingReasonId: string;
}
export interface StoppingFilter extends FilterPagination, FilterSort {
  startDate: Date | null;
  nature: Nature | null;
  search: string;
  endDate: Date | null;
}

export const stoppingFilterInitialState: StoppingFilter = {
  endDate: null,
  nature: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
