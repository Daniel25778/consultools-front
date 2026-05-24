import type { UseQueryResult } from '@tanstack/react-query';
import type { FindMeasurementUnitQuery } from 'domain/models/measurement';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindMeasurementUnitQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindMeasurementUnitQuery> =>
  useFindQuery<FindMeasurementUnitQuery>({ ...props, route: 'measurementUnit' });
