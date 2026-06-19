import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import type { WasteType } from 'domain/models/waste-type';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { FloatButton } from 'presentation/atomic-component/atom';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterWasteTypeModal } from 'presentation/atomic-component/molecule/modal/register-waste-type';
import { WasteTypeList } from 'presentation/atomic-component/organism/list/waste-type';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const WasteTypeContent: FC = () => {
  const modal = useModal();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { companyId } = useParams() as { companyId: string };
  const { removeItems } = useRemoveItems();

  useEffect(() => {
    setFilter('wasteType', { search });
  }, [search]);

  const wasteTypeQuery = useInfiniteScroll<WasteType>({
    filters: {
      companyId,
      search: search
    },
    limit: 30,
    queryName: QueryName.wasteType,
    route: apiPaths.wasteType
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800 rounded-md flex'}>
      <Breadcrumbs
        replaceItems={{ [companyId]: 'Detalhes de empresa' }}
        removeItems={removeItems}
      />
      <div className={'hidden w-full tablet:flex items-center justify-between'}>
        <h2 className={'text-primary text-2xl font-medium w-full'}>Tipos de refugo</h2>
        <div className={'flex items-end justify-end w-full'}>
          <RegisterWasteTypeModal modal={modal} />
        </div>
      </div>
      <div
        className={
          'flex justify-end w-full items-end gap-4 tablet:gap-0 tablet:justify-between flex-col tablet:flex-row'
        }
      >
        <p className={'hidden tablet:flex text-gray-500 dark:text-gray-400'}>
          Exibindo {wasteTypeQuery.data?.length} de um total de{' '}
          {wasteTypeQuery.pagination?.totalElements}{' '}
          {wasteTypeQuery.pagination?.totalElements && wasteTypeQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <div className={'flex justify-between w-full tablet:hidden'}>
          <h2 className={'flex tablet:hidden text-primary text-2xl font-medium'}>
            Tipos de refugo
          </h2>
          <p
            className={'flex tablet:hidden text-primary text-lg font-semibold dark:text-gray-400 '}
          >
            {wasteTypeQuery.data?.length} de {''}
            {wasteTypeQuery.pagination?.totalElements}
          </p>
        </div>
        <SearchInputBase
          value={searchDebounce}
          onChange={(event) => setSearchDebounce(event.target.value)}
          placeholder={'Buscar tipos de refugo'}
        />
      </div>
      <FloatButton modal={modal} />
      <WasteTypeList wasteTypeQuery={wasteTypeQuery} />
    </div>
  );
};
