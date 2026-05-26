import type { UseQueryResult } from '@tanstack/react-query';
import type { FindShiftQuery } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindShiftQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindShiftQuery> =>
  useFindQuery<FindShiftQuery>({ ...props, route: 'shift' });
