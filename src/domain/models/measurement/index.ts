import type { Pagination } from 'domain/protocol/pagination';

export interface FindMeasurementUnitQuery extends Pagination {
  content: MeasurementUnit[];
}

export interface MeasurementUnit {
  id: string;
  code: string;
  name: string;
}
