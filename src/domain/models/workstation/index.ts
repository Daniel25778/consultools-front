import { Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface FindWorkstationQuery extends Pagination {
  content: Workstation[];
}

export interface Workstation {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
export interface WorkstationFilter extends FilterPagination, FilterSort {
  status: Status | null;
  userId: string;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const workstationFilterInitialState: WorkstationFilter = {
  endDate: null,
  status: null,
  page: 1,
  userId: '',
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
