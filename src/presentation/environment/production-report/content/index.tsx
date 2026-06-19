import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import { Role } from 'domain/enums';
import { type ProductionReport } from 'domain/models/production-report';
import { QueryName } from 'main/config';
import { apiPaths } from 'main/config/paths';
import { FloatButton } from 'presentation/atomic-component/atom/float-button';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterProductionReportModal } from 'presentation/atomic-component/molecule/modal';
import { ProductionReportList } from 'presentation/atomic-component/organism';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const ProductionReportContent: FC = () => {
  const { companyId } = useParams() as { companyId: string };
  const { search } = useAppSelector((state) => state.filter.productionReport);
  const modal = useModal();
  const { search: searchData, setSearchDebounce, searchDebounce } = useSearch(search);

  const { user } = useAppSelector((state) => state.persist);
  const { removeItems } = useRemoveItems();

  const userId = companyId ? undefined : user.id;

  const productionReportQuery = useInfiniteScroll<ProductionReport>({
    filters: {
      search: searchData,
      userId,
      companyId: companyId
    },
    limit: 30,
    queryName: QueryName.productionReport,
    route: apiPaths.productionReport
  });

  return (
    <div className={'w-full relative flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      {companyId && (
        <Breadcrumbs
          replaceItems={{ [companyId]: 'Detalhes de empresa' }}
          removeItems={removeItems}
        />
      )}
      <div className={'hidden w-full tablet:flex justify-between flex-col gap-4 tablet:flex-row'}>
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
      <div className={'flex flex-col items-end gap-4 tablet:flex-row justify-between'}>
        <p className={'hidden tablet:flex text-gray-500 dark:text-gray-400 '}>
          Exibindo {productionReportQuery.data?.length} de um total de {''}
          {productionReportQuery.pagination?.totalElements}{' '}
          {productionReportQuery.pagination?.totalElements &&
          productionReportQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <div className={'flex gap-2 w-full tablet:w-auto justify-between'}>
          <h2 className={'flex tablet:hidden text-primary text-2xl font-medium'}>Apontamentos</h2>
          <p
            className={'flex tablet:hidden text-primary text-lg font-semibold dark:text-gray-400 '}
          >
            {productionReportQuery.data?.length} de {''}
            {productionReportQuery.pagination?.totalElements}
          </p>
        </div>
        {user.role === Role.CONSULTANT || user.role === Role.MANAGER ? (
          <SearchInputBase
            value={searchDebounce}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
              setSearchDebounce(event.target.value)
            }
            placeholder={'Buscar apontamentos'}
          />
        ) : null}
      </div>
      <FloatButton modal={modal} />
      <ProductionReportList productionReport={productionReportQuery} companyId={companyId} />
    </div>
  );
};
