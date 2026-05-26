import type { useInfiniteScroll } from 'data/hooks';
import type { Collaborator } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton } from 'presentation/atomic-component/atom/card';
import { CollaboratorCard } from 'presentation/atomic-component/atom/card/collaborator';
import { type FC } from 'react';

interface CollaboratorListProps {
  collaboratorQuery: ReturnType<typeof useInfiniteScroll<Collaborator>>;
}

export const CollaboratorList: FC<CollaboratorListProps> = ({ collaboratorQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={collaboratorQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {collaboratorQuery.data?.map((item) => (
            <CollaboratorCard key={item.id} collaborator={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
