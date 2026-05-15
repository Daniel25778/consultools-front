export interface Pagination {
  page: number;
  limit: number;
  total_elements: number;
  total_pages: number;
}

export interface FilterPagination {
  page: number;
  limit?: number;
}
