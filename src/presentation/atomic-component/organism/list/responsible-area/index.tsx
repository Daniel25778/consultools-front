import { useInfiniteScroll } from 'data/hooks';
import type { ResponsibleArea } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { ResponsibleAreaCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface ResponsibleAreaListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const ResponsibleAreaList: FC<ResponsibleAreaListProps> = ({ setTotalElements }) => {
  const { status, search } = useAppSelector((state) => state.filter.responsibleArea);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  const responsibleAreaQuery = useInfiniteScroll<ResponsibleArea>({
    filters: {
      status: status ? [status] : undefined,
      search: search ? [search] : undefined,
      companyId: companyId
    },
    limit: 10,

    queryName: QueryName.responsibleArea,
    route: apiPaths.responsibleArea
  });

  useEffect(() => {
    setTotalElements(responsibleAreaQuery.data?.length ?? 0);
  }, [responsibleAreaQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={responsibleAreaQuery}>
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
