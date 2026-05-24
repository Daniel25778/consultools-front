import { useInfiniteScroll } from 'data/hooks';
import type { WasteType } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { WasteTypeCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface WasteTypeListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const WasteTypeList: FC<WasteTypeListProps> = ({ setTotalElements }) => {
  const { search } = useAppSelector((state) => state.filter.wasteType);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];
  const wasteTypeQuery = useInfiniteScroll<WasteType>({
    filters: {
      companyId: companyId,
      search: search ? [search] : undefined
    },
    limit: 10,
    queryName: QueryName.wasteType,
    route: apiPaths.wasteType
  });

  useEffect(() => {
    setTotalElements(wasteTypeQuery.data?.length ?? 0);
  }, [wasteTypeQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={wasteTypeQuery}>
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
