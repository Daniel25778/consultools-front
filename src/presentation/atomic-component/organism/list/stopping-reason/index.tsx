import type { useInfiniteScroll } from 'data/hooks';
import type { StoppingReason } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, StoppingReasonCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface StoppingReasonListProps {
  stoppingReasonQuery: ReturnType<typeof useInfiniteScroll<StoppingReason>>;
}

export const StoppingReasonList: FC<StoppingReasonListProps> = ({ stoppingReasonQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={stoppingReasonQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {stoppingReasonQuery.data?.map((item) => (
            <StoppingReasonCard key={item.id} stoppingReason={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
