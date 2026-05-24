import { Status } from 'domain/enums';
import type { FilterPagination, Pagination } from 'domain/protocol/pagination';
import type { FilterSort } from 'domain/protocol/sort';

export interface FindCollaboratorQuery extends Pagination {
  content: Collaborator[];
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  cpf: string;
  status: Status;
  userId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}
export interface CollaboratorFilter extends FilterPagination, FilterSort {
  status: Status | null;
  userId: string;
  startDate: Date | null;
  search: string;
  endDate: Date | null;
}

export const collaboratorFilterInitialState: CollaboratorFilter = {
  endDate: null,
  status: null,
  page: 1,
  userId: '',
  search: '',
  sort: null,
  sortBy: null,
  startDate: null
};
