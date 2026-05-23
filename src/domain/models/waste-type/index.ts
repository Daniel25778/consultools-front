import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface FindWasteTypeQuery extends Pagination {
  content: WasteType[];
}

export interface WasteType {
  id: string;
  code: string;
  name: string;
  description: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WasteTypeFilter extends FilterPagination, FilterSort {
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const wasteTypeFilterInitialState: WasteTypeFilter = {
  endDate: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
