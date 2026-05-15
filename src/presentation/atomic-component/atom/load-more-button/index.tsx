import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import type { FC } from 'react';
import { useCallback, useEffect, useRef } from 'react';

interface LoadMoreButtonProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isLoadingRef.current) {
        isLoadingRef.current = true;
        await fetchNextPage();
        isLoadingRef.current = false;
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-80px',
      threshold: 0.1
    });

    const el = buttonRef.current;

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [handleIntersection]);

  if (hasNextPage) return <div className={'h-[80px]'} ref={buttonRef}></div>;

  return <div />;
};
