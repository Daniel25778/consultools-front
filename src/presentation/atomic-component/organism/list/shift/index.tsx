import { useInfiniteScroll } from 'data/hooks';
import type { Shift } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { ShiftCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface ShiftListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const ShiftList: FC<ShiftListProps> = ({ setTotalElements }) => {
  const { search } = useAppSelector((state) => state.filter.shift);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];
  const shiftQuery = useInfiniteScroll<Shift>({
    filters: {
      companyId: companyId,
      name: search ? [search] : undefined
    },
    limit: 10,
    queryName: QueryName.shift,
    route: apiPaths.shift
  });

  useEffect(() => {
    setTotalElements(shiftQuery.data?.length ?? 0);
  }, [shiftQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={shiftQuery}>
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
