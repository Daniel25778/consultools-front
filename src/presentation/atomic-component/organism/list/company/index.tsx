import { useInfiniteScroll } from 'data/hooks';
import type { Company } from 'domain/models';
import { QueryName, apiPaths, paths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CompanyCard } from 'presentation/atomic-component/atom/card/company';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';

interface CompanyListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const CompanyList: FC<CompanyListProps> = ({ setTotalElements }) => {
  const { status, userId, search } = useAppSelector((state) => state.filter.company);
  const navigate = useNavigate();

  const companyQuery = useInfiniteScroll<Company>({
    filters: {
      status: status ? [status] : undefined,
      userId: userId ? [userId] : undefined,
      search: search ? [search] : undefined
    },
    limit: 10,
    queryName: QueryName.company,
    route: apiPaths.company
  });

  useEffect(() => {
    setTotalElements(companyQuery.data?.length ?? 0);
  }, [companyQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={companyQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {companyQuery.data?.map((item) => (
            <CompanyCard
              key={item.id}
              onClick={() => navigate(paths.companyDetails(item.id))}
              id={item.id}
              name={item.name}
              cnpj={item.cnpj}
              createdAt={item.createdAt}
              status={item.status}
            />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
