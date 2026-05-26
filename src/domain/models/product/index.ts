import { Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';
import type { MeasurementUnit } from '../measurement';

export interface FindProductQuery extends Pagination {
  content: Product[];
}
export interface Product {
  id: string;
  name: string;
  status: Status;
  measurementUnit: MeasurementUnit;
  userId: string;
  createdAt: string;
  updatedAt: string;
  description: 'string';
  companyId: 'string';
}
export interface ProductFilter extends FilterPagination, FilterSort {
  status: Status | null;
  userId: string;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const productFilterInitialState: ProductFilter = {
  endDate: null,
  status: null,
  page: 1,
  userId: '',
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
