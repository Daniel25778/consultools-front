import type { Role, Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface LoginPayload {
  accessToken: string;
  user: User;
}

export interface FindUserQuery extends Pagination {
  content: User[];
}

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  imageUrl: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface UserFilter extends FilterPagination, FilterSort {
  status: Status | null;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const userFilterInitialState: UserFilter = {
  endDate: null,
  status: null,
  page: 1,
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
