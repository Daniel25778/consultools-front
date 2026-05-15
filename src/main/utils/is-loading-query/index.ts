/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseQueryResult } from 'react-query';

export const isLoadingQuery = (query: UseQueryResult<any>): boolean =>
  (query?.isFetching && query?.isPreviousData) || query.isLoading;
