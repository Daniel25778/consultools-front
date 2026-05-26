import { useInfiniteScroll, useModal } from 'data/hooks';
import { finishedOptions, type ProductionReport } from 'domain/models/production-report';
import { QueryName } from 'main/config';
import { apiPaths } from 'main/config/paths';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { RegisterProductionReportModal } from 'presentation/atomic-component/molecule/modal';
import { ProductionReportList } from 'presentation/atomic-component/organism';
import { type FC } from 'react';
import { useAppSelector } from 'store/index';

export const ProductionReportContent: FC = () => {
  const { finishedAt, search } = useAppSelector((state) => state.filter.productionReport);
  const modal = useModal();
  const { user } = useAppSelector((state) => state.persist);
  const productionReportQuery = useInfiniteScroll<ProductionReport>({
    filters: {
      finishedAt: finishedAt,
      search: search,
      userId: user.id,
      companyId: user.companyId
    },
    limit: 20,
    queryName: QueryName.productionReport,
    route: apiPaths.productionReport
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <div className={'w-full flex items-center justify-between'}>
        <h2 className={'text-primary text-2xl font-medium'}>Apontamentos</h2>
        <RegisterProductionReportModal
          modal={{
            ...modal,
            closeModal() {
              modal.closeModal();
            }
          }}
        />
      </div>
      <div className={'flex items-end flex-col-reverse gap-4 tablet:flex-row justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400 tablet:hidden'}>
          Exibindo {productionReportQuery.data?.length} de um total de
          {productionReportQuery.pagination?.totalElements}{' '}
          {productionReportQuery.pagination?.totalElements &&
          productionReportQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
          <Select
            id={''}
            options={finishedOptions}
            value={
              finishedOptions.find(
                (option) => option.value === (finishedAt !== null ? String(finishedAt) : '')
              ) ?? null
            }
            onChange={(event) => {
              const newValue = event as SelectValues | SelectValues[] | null;
              const selectedValue = Array.isArray(newValue) ? newValue[0]?.value : newValue?.value;
              const finishedValue =
                selectedValue === 'true' ? true : selectedValue === 'false' ? false : null;

              setFilter('productionReport', {
                finishedAt: finishedValue
              });
            }}
            placeholder={'Filtrar por status'}
          />
        </div>
      </div>
      <ProductionReportList productionReport={productionReportQuery} />
    </div>
  );
};
