import { useInfiniteScroll } from 'data/hooks';
import type { Collaborator } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CollaboratorCard } from 'presentation/atomic-component/atom/card/collaborator';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface CollaboratorListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const CollaboratorList: FC<CollaboratorListProps> = ({ setTotalElements }) => {
  const { status, search } = useAppSelector((state) => state.filter.collaborator);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  const collaboratorQuery = useInfiniteScroll<Collaborator>({
    filters: {
      status: status ? [status] : undefined,
      search: search ? [search] : undefined,
      companyId: companyId
    },
    limit: 10,

    queryName: QueryName.collaborator,
    route: apiPaths.collaborator
  });

  useEffect(() => {
    setTotalElements(collaboratorQuery.data?.length ?? 0);
  }, [collaboratorQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={collaboratorQuery}>
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
