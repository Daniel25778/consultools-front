import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api } from 'infra/http';
import type { QueryList } from 'main/config';
import { QueryName, apiPaths } from 'main/config';

export interface useFindQueryProps {
  page?: number;
  limit?: number;
  params?: object;
  apiRoute?: string;
  retry?: number;
  refetchInterval?: number;
  hideId?: number;
  id?: string;
}

export interface queryProps extends useFindQueryProps {
  route?: QueryList;
}

export const useFindQuery = <T>({
  page,
  params,
  apiRoute,
  id,
  hideId,
  refetchInterval,
  retry,
  limit,
  route,
}: queryProps): UseQueryResult<T, Error> =>
  useQuery<T, Error>({
    queryKey: [
      QueryName[route ?? 'default'],
      id,
      limit,
      page,
      params ? Object.values(params) : null,
    ],
    queryFn: async () =>
      api.get<T>({
        id: hideId ? undefined : id,
        queryParams: { limit, page, ...params },
        route: apiRoute ?? apiPaths[route ?? 'default'],
      }),
    refetchInterval,
    retry,
  });
