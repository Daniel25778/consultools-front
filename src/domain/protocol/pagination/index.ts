export interface Pagination {
  elements: number;
  limit: number;
  page: number;
  totalElements: number;
  totalPages: number;
}

export interface FilterPagination {
  page: number;
  limit?: number;
}
