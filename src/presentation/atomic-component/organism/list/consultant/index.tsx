import type { useInfiniteScroll } from 'data/hooks';
import type { User } from 'domain/models';
import { paths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, ConsultantCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConsultantListProps {
  userQuery: ReturnType<typeof useInfiniteScroll<User>>;
}

export const ConsultantList: FC<ConsultantListProps> = ({ userQuery }) => {
  const navigate = useNavigate();
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={userQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))' }}
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
