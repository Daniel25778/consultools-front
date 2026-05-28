import { useInfiniteScroll, useModal, useSearch } from 'data/hooks';
import type { Shift } from 'domain/models';
import { apiPaths } from 'main/config';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterShiftModal } from 'presentation/atomic-component/molecule/modal';
import { ShiftList } from 'presentation/atomic-component/organism';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ShiftContent: FC = () => {
  const modal = useModal();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { id = '' } = useParams<{ id: string }>();

  useEffect(() => {
    setFilter('shift', { search });
  }, [search]);

  const shiftQuery = useInfiniteScroll<Shift>({
    filters: {
      companyId: id,
      name: search
    },
    limit: 20,
    queryName: QueryName.shift,
    route: apiPaths.shift
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800 rounded-md flex'}>
      <Breadcrumbs replaceItems={{ [id]: 'Detalhes de empresa' }} />
      <div className={'w-full flex flex-col gap-4  tablet:flex-row tablet:justify-between'}>
        <h2 className={'text-primary text-2xl font-medium w-full'}>Turnos</h2>
        <div className={'flex items-end justify-end w-full'}>
          <RegisterShiftModal modal={modal} />
        </div>
      </div>
      <div
        className={
          'flex justify-end items-end gap-4 tablet:gap-0 tablet:justify-between flex-col-reverse tablet:flex-row'
        }
      >
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {shiftQuery.data?.length} de um total de {shiftQuery.pagination?.totalElements}{' '}
          {shiftQuery.pagination?.totalElements && shiftQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <SearchInputBase
          value={searchDebounce}
          onChange={(event) => setSearchDebounce(event.target.value)}
          placeholder={'Buscar turno'}
        />
      </div>
      <ShiftList shiftQuery={shiftQuery} />
    </div>
  );
};
