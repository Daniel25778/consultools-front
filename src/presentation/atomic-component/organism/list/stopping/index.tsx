import type { useInfiniteScroll } from 'data/hooks';
import type { Stopping } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, StoppingCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface StoppingListProps {
  stoppingQuery: ReturnType<typeof useInfiniteScroll<Stopping>>;
  companyId?: string;
}

export const StoppingList: FC<StoppingListProps> = ({ stoppingQuery, companyId }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={stoppingQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {stoppingQuery.data?.map((item) => (
            <StoppingCard key={item.id} stopping={item} companyId={companyId} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
