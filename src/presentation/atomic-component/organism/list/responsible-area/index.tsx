import type { useInfiniteScroll } from 'data/hooks';
import type { ResponsibleArea } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, ResponsibleAreaCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface ResponsibleAreaListProps {
  responsibleAreaQuery: ReturnType<typeof useInfiniteScroll<ResponsibleArea>>;
}

export const ResponsibleAreaList: FC<ResponsibleAreaListProps> = ({ responsibleAreaQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={responsibleAreaQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {responsibleAreaQuery.data?.map((item) => (
            <ResponsibleAreaCard key={item.id} responsibleArea={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
