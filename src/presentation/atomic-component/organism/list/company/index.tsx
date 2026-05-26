import type { useInfiniteScroll } from 'data/hooks';
import type { Company } from 'domain/models';
import { paths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton } from 'presentation/atomic-component/atom/card';
import { CompanyCard } from 'presentation/atomic-component/atom/card/company';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface CompanyListProps {
  companyQuery: ReturnType<typeof useInfiniteScroll<Company>>;
}

export const CompanyList: FC<CompanyListProps> = ({ companyQuery }) => {
  const navigate = useNavigate();

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={companyQuery}>
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
