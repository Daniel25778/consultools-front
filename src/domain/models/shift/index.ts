import { Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface FindShiftQuery extends Pagination {
  content: Shift[];
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  companyId: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
export interface ShiftFilter extends FilterPagination, FilterSort {
  status: Status | null;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const shiftFilterInitialState: ShiftFilter = {
  endDate: null,
  status: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
