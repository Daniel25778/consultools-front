import type { useInfiniteScroll } from 'data/hooks';
import type { Shift } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, ShiftCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface ShiftListProps {
  shiftQuery: ReturnType<typeof useInfiniteScroll<Shift>>;
}

export const ShiftList: FC<ShiftListProps> = ({ shiftQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={shiftQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {shiftQuery.data?.map((item) => (
            <ShiftCard key={item.id} shift={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
