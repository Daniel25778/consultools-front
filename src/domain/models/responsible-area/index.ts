import { Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface FindResponsibleAreaQuery extends Pagination {
  content: ResponsibleArea[];
}

export interface ResponsibleArea {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
export interface ResponsibleAreaFilter extends FilterPagination, FilterSort {
  status: Status | null;
  userId: string;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const responsibleAreaFilterInitialState: ResponsibleAreaFilter = {
  endDate: null,
  status: null,
  page: 1,
  userId: '',
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
