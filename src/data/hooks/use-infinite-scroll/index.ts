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
      getNextPageParam: (props: unknown) => {
        const data = props as { page: number; total_pages: number };
        if (data?.page < data?.total_pages) {
          return data?.page + 1;
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
      total_elements: number;
      total_pages: number;
    };

    if (typeof item1?.total_elements === 'number' && typeof item1?.total_pages === 'number')
      setPagination({
        total_elements: item1?.total_elements,
        total_pages: item1?.total_pages
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
