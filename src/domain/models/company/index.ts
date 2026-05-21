import { Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface FindCompanyQuery extends Pagination {
  content: Company[];
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  status: Status;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
export interface CompanyFilter extends FilterPagination, FilterSort {
  status: Status | null;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const companyFilterInitialState: CompanyFilter = {
  endDate: null,
  status: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
