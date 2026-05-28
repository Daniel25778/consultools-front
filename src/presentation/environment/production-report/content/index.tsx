import { useInfiniteScroll, useModal } from 'data/hooks';
import { type ProductionReport } from 'domain/models/production-report';
import { QueryName } from 'main/config';
import { apiPaths } from 'main/config/paths';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { RegisterProductionReportModal } from 'presentation/atomic-component/molecule/modal';
import { ProductionReportList } from 'presentation/atomic-component/organism';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const ProductionReportContent: FC = () => {
  const { id: urlCompanyId } = useParams<{ id: string }>();
  const { search } = useAppSelector((state) => state.filter.productionReport);
  const modal = useModal();
  const { user } = useAppSelector((state) => state.persist);

  const companyId = urlCompanyId;
  const userId = urlCompanyId ? undefined : user.id;

  const productionReportQuery = useInfiniteScroll<ProductionReport>({
    filters: {
      search: search,
      userId,
      companyId: companyId
    },
    limit: 20,
    queryName: QueryName.productionReport,
    route: apiPaths.productionReport
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      {urlCompanyId && <Breadcrumbs replaceItems={{ [urlCompanyId]: 'Detalhes de empresa' }} />}
      <div className={'w-full flex  justify-between flex-col gap-4 tablet:flex-row'}>
        <h2 className={'text-primary text-2xl font-medium'}>Apontamentos</h2>
        <RegisterProductionReportModal
          companyId={companyId}
          modal={{
            ...modal,
            closeModal() {
              modal.closeModal();
            }
          }}
        />
      </div>
      <div className={'flex items-end flex-col-reverse gap-4 tablet:flex-row justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400 '}>
          Exibindo {productionReportQuery.data?.length} de um total de {''}
          {productionReportQuery.pagination?.totalElements}{' '}
          {productionReportQuery.pagination?.totalElements &&
          productionReportQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
      </div>
      <ProductionReportList productionReport={productionReportQuery} companyId={companyId} />
    </div>
  );
};
