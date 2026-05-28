import {
  useInfiniteQuery,
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult
} from '@tanstack/react-query';
import type { Pagination } from 'domain/protocol';
import { api } from 'infra/http';
import type { QueryName } from 'main/config';
import { useEffect, useState } from 'react';
export interface useInfiniteScrollProps {
  route: string;
  queryName: QueryName;
  limit: number;
  retry?: number;
  refetchInterval?: number;
  filters?: object;
}

export interface useInfiniteScrollReturnProps {
  data: unknown[] | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  error: unknown;
  pagination?: Partial<Pagination> | null;
}

export const useInfiniteScroll = <T>({
  route,
  queryName,
  limit,
  retry,
  refetchInterval,
  filters
}: useInfiniteScrollProps): useInfiniteScrollReturnProps & {
  data: T[] | undefined;
} => {
  const [pagination, setPagination] = useState<Partial<Pagination> | null>(null);
  const [newData, setNewData] = useState<T[]>([]);
  const filter = filters ?? {};

  const fetchItems = async ({ pageParam = 1 }): Promise<unknown> =>
    api.get<unknown>({
      queryParams: { limit, page: pageParam, ...filter },
      route
    });

  const { data, fetchNextPage, hasNextPage, error, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [queryName, ...Object.values(filter)],
      queryFn: async ({ pageParam = 1 }) => fetchItems({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (_lastPage, pages) => {
        const currentPage = pages.length;
        const lastPage = _lastPage as any;
        const totalPages = lastPage?.totalPages ?? lastPage?.total_pages;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }
        return undefined;
      },
      refetchInterval,
      retry
    });

  useEffect(() => {
    const items: T[] = [];
    data?.pages?.forEach((pages) => {
      const page = pages as unknown as {
        content: T[];
      };

      page?.content?.forEach((item) => {
        items.push(item);
      });
    });

    const item1 = data?.pages?.[0] as unknown as {
      content: T[];
    } & Partial<Pagination>;

    if (typeof item1?.totalElements === 'number' && typeof item1?.totalPages === 'number')
      setPagination({
        elements: item1.elements,
        limit: item1.limit,
        page: item1.page,
        totalElements: item1.totalElements,
        totalPages: item1.totalPages
      });

    setNewData(items);
  }, [data]);

  return {
    data: newData,
    error,
    fetchNextPage,
    hasNextPage: hasNextPage === undefined ? true : hasNextPage,
    isFetching,
    isFetchingNextPage,
    pagination
  };
};
