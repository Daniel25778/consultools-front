import type { useInfiniteScrollReturnProps } from 'data/hooks';
import { LoadMoreButton } from 'presentation/atomic-component/atom/load-more-button';
import type { FC, ReactNode } from 'react';

interface FetchOnScrollProps {
  query: useInfiniteScrollReturnProps;
  children: ReactNode;
  className?: string;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, fetchNextPage, error, isFetching, data },
  children,
  className
}) => {
  const isEmpty = !isFetching && !isFetchingNextPage && !error && data?.length === 0;

  return (
    <div className={className}>
      {isEmpty ? (
        <div
          className={
            'flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/20 rounded-xl border-2  border-gray-100 dark:border-gray-700'
          }
        >
          <p className={'text-gray-500 dark:text-gray-400 text-lg font-medium'}>
            Nenhum registro encontrado
          </p>
          <p className={'text-gray-400 dark:text-gray-500 text-sm mt-1'}>
            Não há itens para exibir no momento.
          </p>
        </div>
      ) : (
        children
      )}

      {error || isFetching || isEmpty ? null : (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}

      {(isFetching || isFetchingNextPage) && (
        <div className={'flex text-primary justify-center col-span-2 text-xl font-semibold'}>
          Buscando ...
        </div>
      )}
    </div>
  );
};
