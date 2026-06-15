import type { useInfiniteScroll } from 'data/hooks';
import type { ProductionReport } from 'domain/models';
import { paths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, ProductionReportCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface ProductionReportListProps {
  productionReport: ReturnType<typeof useInfiniteScroll<ProductionReport>>;
  companyId?: string;
}

export const ProductionReportList: FC<ProductionReportListProps> = ({
  productionReport,
  companyId
}) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={productionReport}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {productionReport.data?.map((item) => (
            <ProductionReportCard
              link={
                companyId
                  ? paths.productionReportDetailsCompany(item.id, companyId)
                  : paths.productionReportDetails(item.id)
              }
              key={item.id}
              productionReport={item}
            />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
