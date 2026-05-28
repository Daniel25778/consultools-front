import type { useInfiniteScroll } from 'data/hooks';
import type { Workstation } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, WorkstationCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface WorkstationListProps {
  workstationQuery: ReturnType<typeof useInfiniteScroll<Workstation>>;
}

export const WorkstationList: FC<WorkstationListProps> = ({ workstationQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={workstationQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {workstationQuery.data?.map((item) => (
            <WorkstationCard key={item.id} workstation={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
