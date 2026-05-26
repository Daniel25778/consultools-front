import type { useInfiniteScroll } from 'data/hooks';
import type { WasteType } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, WasteTypeCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface WasteTypeListProps {
  wasteTypeQuery: ReturnType<typeof useInfiniteScroll<WasteType>>;
}

export const WasteTypeList: FC<WasteTypeListProps> = ({ wasteTypeQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={wasteTypeQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {wasteTypeQuery.data?.map((item) => (
            <WasteTypeCard key={item.id} wasteType={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
