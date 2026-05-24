import { useInfiniteScroll } from 'data/hooks';
import type { Workstation } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { WorkstationCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface WorkstationListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const WorkstationList: FC<WorkstationListProps> = ({ setTotalElements }) => {
  const { status, search } = useAppSelector((state) => state.filter.workstation);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  const workstationQuery = useInfiniteScroll<Workstation>({
    filters: {
      status: status ? [status] : undefined,
      search: search ? [search] : undefined,
      companyId: companyId
    },
    limit: 10,

    queryName: QueryName.workstation,
    route: apiPaths.workstation
  });

  useEffect(() => {
    setTotalElements(workstationQuery.data?.length ?? 0);
  }, [workstationQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={workstationQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
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
