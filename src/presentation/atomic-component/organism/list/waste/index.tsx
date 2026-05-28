import type { useInfiniteScroll } from 'data/hooks';
import type { Waste } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton } from 'presentation/atomic-component/atom/card';
import { WasteCard } from 'presentation/atomic-component/atom/card/waste';
import { type FC } from 'react';

interface WasteListProps {
  wasteQuery: ReturnType<typeof useInfiniteScroll<Waste>>;
  companyId?: string;
}

export const WasteList: FC<WasteListProps> = ({ wasteQuery, companyId }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={wasteQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {wasteQuery.data?.map((item) => (
            <WasteCard key={item.id} waste={item} companyId={companyId} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
