import { useInfiniteScroll } from 'data/hooks';
import type { User } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { ConsultantCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface ConsultantListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const ConsultantList: FC<ConsultantListProps> = ({ setTotalElements }) => {
  const { status } = useAppSelector((state) => state.filter.user);

  const userQuery = useInfiniteScroll<User>({
    filters: {
      statusEnum: status ? [status] : undefined
    },
    limit: 10,
    queryName: QueryName.user,
    route: apiPaths.user
  });

  useEffect(() => {
    if (userQuery.data?.length !== undefined) setTotalElements(userQuery.data?.length);
  }, [userQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={userQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {userQuery.data?.map((item) => (
            <ConsultantCard id={item.id} name={item.name} email={item.email} status={item.status} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
