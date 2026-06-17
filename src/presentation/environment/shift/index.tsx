import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import { type Shift } from 'domain/models';
import { apiPaths } from 'main/config';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterShiftModal } from 'presentation/atomic-component/molecule/modal';
import { ShiftList } from 'presentation/atomic-component/organism';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const ShiftContent: FC = () => {
  const modal = useModal();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { status } = useAppSelector((state) => state.filter.shift);
  const { companyId } = useParams() as { companyId: string };
  const { removeItems } = useRemoveItems();

  useEffect(() => {
    setFilter('shift', { search });
  }, [search]);

  const shiftQuery = useInfiniteScroll<Shift>({
    filters: {
      companyId,
      status,
      name: search
    },
    limit: 30,
    queryName: QueryName.shift,
    route: apiPaths.shift
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800 rounded-md flex'}>
      <Breadcrumbs
        replaceItems={{ [companyId]: 'Detalhes de empresa' }}
        removeItems={removeItems}
      />
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

        <div className={'flex items-end gap-4 flex-col-reverse tablet:flex-row'}>
          <SearchInputBase
            value={searchDebounce}
            onChange={(event) => setSearchDebounce(event.target.value)}
            placeholder={'Buscar turno'}
          />

          {/* <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
            <Select
              id={''}
              options={statusOptions}
              value={statusOptions.find((option) => option.value === (status ?? '')) ?? null}
              onChange={(event) => {
                const newValue = event as SelectValues | SelectValues[] | null;
                const selectedValue = Array.isArray(newValue)
                  ? newValue[0]?.value
                  : newValue?.value;

                setFilter('shift', {
                  status: selectedValue ? (selectedValue as Status) : null
                });
              }}
              placeholder={'Filtrar por status'}
            />
          </div> */}
        </div>
      </div>
      <ShiftList shiftQuery={shiftQuery} />
    </div>
  );
};
