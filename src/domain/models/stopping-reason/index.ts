import { Nature, Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';
import type { ResponsibleArea } from '../responsible-area';

export interface FindStoppingReasonQuery extends Pagination {
  content: StoppingReason[];
}

export interface StoppingReasonDetails extends StoppingReason {
  responsibleArea: ResponsibleArea;
}

export interface StoppingReason {
  id: string;
  name: string;
  status: Status;
  userId: string;
  description: string;
  companyId: string;
  nature: Nature;
  responsibleAreaId: string;
  createdAt: string;
  updatedAt: string;
}
export interface StoppingReasonFilter extends FilterPagination, FilterSort {
  status: Status | null;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const stoppingReasonFilterInitialState: StoppingReasonFilter = {
  endDate: null,
  status: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
