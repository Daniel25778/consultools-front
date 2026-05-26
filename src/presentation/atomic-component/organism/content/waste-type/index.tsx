import { useInfiniteScroll, useModal, useSearch } from 'data/hooks';
import type { WasteType } from 'domain/models/waste-type';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterWasteTypeModal } from 'presentation/atomic-component/molecule/modal/register-waste-type';
import { WasteTypeList } from 'presentation/atomic-component/organism/list/waste-type';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const WasteTypeContent: FC = () => {
  const modal = useModal();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { id = '' } = useParams<{ id: string }>();

  useEffect(() => {
    setFilter('wasteType', { search });
  }, [search]);

  const wasteTypeQuery = useInfiniteScroll<WasteType>({
    filters: {
      companyId: id,
      search: search
    },
    limit: 20,
    queryName: QueryName.wasteType,
    route: apiPaths.wasteType
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800 rounded-md flex'}>
      <div
        className={
          'w-full flex flex-col-reverse items-end gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <SearchInputBase
          value={searchDebounce}
          onChange={(event) => setSearchDebounce(event.target.value)}
          placeholder={'Buscar tipos de refugo'}
        />
        <RegisterWasteTypeModal modal={modal} />
      </div>
      <div className={'flex items-end'}>
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {wasteTypeQuery.data?.length} de um total de{' '}
          {wasteTypeQuery.pagination?.totalElements}{' '}
          {wasteTypeQuery.pagination?.totalElements && wasteTypeQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
      </div>
      <WasteTypeList wasteTypeQuery={wasteTypeQuery} />
    </div>
  );
};
