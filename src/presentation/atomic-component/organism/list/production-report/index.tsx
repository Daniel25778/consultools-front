import type { useInfiniteScroll } from 'data/hooks';
import type { ProductionReport } from 'domain/models';
import { paths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, ProductionReportCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductionReportListProps {
  productionReport: ReturnType<typeof useInfiniteScroll<ProductionReport>>;
}

export const ProductionReportList: FC<ProductionReportListProps> = ({ productionReport }) => {
  const navigate = useNavigate();

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={productionReport}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {productionReport.data?.map((item) => (
            <ProductionReportCard
              onClick={() => navigate(paths.productionReportDetails(item.id))}
              key={item.id}
              productionReport={item}
            />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
