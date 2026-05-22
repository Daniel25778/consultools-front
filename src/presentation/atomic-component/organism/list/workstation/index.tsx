import { useInfiniteScroll } from 'data/hooks';
import type { User } from 'domain/models';
import { QueryName, apiPaths, paths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { ConsultantCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';

interface WorkstationListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const WorkstationList: FC<WorkstationListProps> = ({ setTotalElements }) => {
  const { status } = useAppSelector((state) => state.filter.user);
  const navigate = useNavigate();

  const userQuery = useInfiniteScroll<User>({
    filters: {
      status: status ? [status] : undefined
    },
    limit: 10,
    queryName: QueryName.user,
    route: apiPaths.user
  });

  useEffect(() => {
    setTotalElements(userQuery.data?.length ?? 0);
  }, [userQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={userQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {userQuery.data?.map((item) => (
            <ConsultantCard
              onClick={() => navigate(paths.consultantDetails(item.id))}
              id={item.id}
              name={item.name}
              email={item.email}
              status={item.status}
            />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
