import type { UseQueryResult } from '@tanstack/react-query';
import type { FindWorkstationQuery } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindWorkstationQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindWorkstationQuery> =>
  useFindQuery<FindWorkstationQuery>({ ...props, route: 'workstation' });
