import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import type { Nature } from 'domain/enums';
import { type Stopping } from 'domain/models';
import { natureOptions } from 'domain/models/nature';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterStoppingModal } from 'presentation/atomic-component/molecule/modal';
import { StoppingList } from 'presentation/atomic-component/organism';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const StoppingContent: FC = () => {
  const modal = useModal();
  const { id = '', companyId } = useParams<{ id: string; companyId?: string }>();
  const { nature } = useAppSelector((state) => state.filter.stopping);
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { removeItems } = useRemoveItems();

  useEffect(() => {
    setFilter('stopping', {
      search,
      nature
    });
  }, [search, nature]);
  const stoppingQuery = useInfiniteScroll<Stopping>({
    filters: {
      search: search,
      nature: nature,
      productionReportingId: id
    },
    limit: 30,
    queryName: QueryName.stopping,
    route: apiPaths.stopping
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <Breadcrumbs
        replaceItems={{
          ...(companyId && { [companyId]: 'Detalhes de Empresa' }),
          [id]: 'Detalhes de Apontamento'
        }}
        removeItems={removeItems}
      />
      <div className={'w-full flex flex-col gap-4 tablet:flex-row tablet:justify-between'}>
        <h2 className={'text-primary text-2xl font-medium'}>Paradas</h2>
        <div>
          <RegisterStoppingModal
            modal={{
              ...modal,
              closeModal() {
                modal.closeModal();
              }
            }}
            companyId={companyId}
          />
        </div>
      </div>
      <div className={'flex items-end flex-col-reverse gap-4 tablet:flex-row justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400 w-full'}>
          Exibindo {stoppingQuery.data?.length} de um total de{' '}
          {stoppingQuery.pagination?.totalElements}{' '}
          {stoppingQuery.pagination?.totalElements && stoppingQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>

        <div className={'flex w-full justify-end items-end gap-4 flex-col-reverse tablet:flex-row'}>
          <SearchInputBase
            value={searchDebounce}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
              setSearchDebounce(event.target.value)
            }
            placeholder={'Buscar paradas'}
          />
          <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
            <Select
              id={''}
              options={natureOptions}
              value={natureOptions.find((option) => option.value === (nature ?? '')) ?? null}
              onChange={(event) => {
                const newValue = event as SelectValues | SelectValues[] | null;
                const selectedValue = Array.isArray(newValue)
                  ? newValue[0]?.value
                  : newValue?.value;

                setFilter('stopping', {
                  nature: selectedValue ? (selectedValue as Nature) : null
                });
              }}
              placeholder={'Filtrar por status'}
            />
          </div>
        </div>
      </div>
      <StoppingList stoppingQuery={stoppingQuery} companyId={companyId} />
    </div>
  );
};
