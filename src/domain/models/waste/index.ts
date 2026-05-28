import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';
import type { WasteType } from '../waste-type';

export interface FindWasteQuery extends Pagination {
  content: Waste[];
}
export interface Waste {
  endTime: string;
  startTime: string;
  code: string;
  wasteReasonId: string;
  id: 'string';
  quantity: 0;
  wasteTypeId: 'string';
  wasteType: WasteType;
  productionReportingId: 'string';
  createdAt: 'string';
  updatedAt: 'string';
}
export interface WasteFilter extends FilterPagination, FilterSort {
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const wasteFilterInitialState: WasteFilter = {
  endDate: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
