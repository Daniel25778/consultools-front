export type Sort = 'ASC' | 'DESC' | null;

export interface FilterSort {
  sort: Sort;
  sortBy: string | null;
}
