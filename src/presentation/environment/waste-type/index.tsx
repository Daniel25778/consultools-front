import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import type { WasteType } from 'domain/models/waste-type';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
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
      <div className={'w-full flex flex-col gap-4  tablet:flex-row tablet:justify-between'}>
        <h2 className={'text-primary text-2xl font-medium w-full'}>Tipos de refugo</h2>
        <div className={'flex items-end justify-end w-full'}>
          <RegisterWasteTypeModal modal={modal} />
        </div>
      </div>
      <div
        className={
          'flex justify-end w-full items-end gap-4 tablet:gap-0 tablet:justify-between flex-col-reverse tablet:flex-row'
        }
      >
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {wasteTypeQuery.data?.length} de um total de{' '}
          {wasteTypeQuery.pagination?.totalElements}{' '}
          {wasteTypeQuery.pagination?.totalElements && wasteTypeQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <SearchInputBase
          value={searchDebounce}
          onChange={(event) => setSearchDebounce(event.target.value)}
          placeholder={'Buscar tipos de refugo'}
        />
      </div>
      <WasteTypeList wasteTypeQuery={wasteTypeQuery} />
    </div>
  );
};
