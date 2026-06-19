import type { UseQueryResult } from '@tanstack/react-query';
import type {
  DashboardContentMap,
  FindDashboardQuery,
  FindDashboardTypesQuery
} from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindDashboardQuery = <T extends keyof DashboardContentMap>({
  companyId,
  type,
  params,
  ...props
}: useFindQueryProps & { type: T; companyId: string }): UseQueryResult<FindDashboardQuery<T>> =>
  useFindQuery<FindDashboardQuery<T>>({
    ...props,
    route: 'dashboard',
    id: companyId,
    params: { type, ...params }
  });

export const useFindDashboardTypesQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindDashboardTypesQuery> =>
  useFindQuery<FindDashboardTypesQuery>({ ...props, route: 'dashboardTypes' });
