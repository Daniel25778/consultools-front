import type { useInfiniteScrollReturnProps } from 'data/hooks';
import { LoadMoreButton } from 'presentation/atomic-component/atom/load-more-button';
import type { FC, ReactNode } from 'react';

interface FetchOnScrollProps {
  query: useInfiniteScrollReturnProps;
  children: ReactNode;
  className?: string;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, fetchNextPage, error, isFetching },
  children,
  className
}) => {
  return (
    <div className={className}>
      {children}

      {error || isFetching ? null : (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}

      {(isFetching || isFetchingNextPage) && (
        <div className={'flex justify-center col-span-2 text-xl font-semibold'}>Buscando ...</div>
      )}
    </div>
  );
};
