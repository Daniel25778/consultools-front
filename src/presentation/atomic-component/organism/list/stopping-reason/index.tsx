import { useInfiniteScroll } from 'data/hooks';
import type { StoppingReason } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { StoppingReasonCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface StoppingReasonListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const StoppingReasonList: FC<StoppingReasonListProps> = ({ setTotalElements }) => {
  const { status, search } = useAppSelector((state) => state.filter.stoppingReason);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  const stoppingReasonQuery = useInfiniteScroll<StoppingReason>({
    filters: {
      status: status ? [status] : undefined,
      search: search ? [search] : undefined,
      companyId: companyId ? [companyId] : undefined
    },
    limit: 10,
    queryName: QueryName.stoppingReason,
    route: apiPaths.stoppingReason
  });

  useEffect(() => {
    setTotalElements(stoppingReasonQuery.data?.length ?? 0);
  }, [stoppingReasonQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={stoppingReasonQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
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
