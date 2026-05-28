import { useInfiniteScroll, useModal, useSearch } from 'data/hooks';
import type { Stopping } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterStoppingModal } from 'presentation/atomic-component/molecule/modal';
import { StoppingList } from 'presentation/atomic-component/organism';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const StoppingContent: FC = () => {
  const modal = useModal();
  const { id = '' } = useParams<{ id: string }>();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  useEffect(() => {
    setFilter('stopping', {
      search
    });
  }, [search]);
  const stoppingQuery = useInfiniteScroll<Stopping>({
    filters: {
      search: search,
      productionReportingId: id
    },
    limit: 20,
    queryName: QueryName.stopping,
    route: apiPaths.stopping
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <Breadcrumbs replaceItems={{ [id]: 'Detalhes de apontamento' }} />
      <div
        className={
          'w-full flex flex-col-reverse items-end gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <h2 className={'text-primary text-2xl font-medium'}>Paradas</h2>

        <RegisterStoppingModal
          modal={{
            ...modal,
            closeModal() {
              modal.closeModal();
            }
          }}
        />
      </div>
      <div className={'flex items-end flex-col-reverse gap-4 tablet:flex-row justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {stoppingQuery.data?.length} de um total de{' '}
          {stoppingQuery.pagination?.totalElements}{' '}
          {stoppingQuery.pagination?.totalElements && stoppingQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <SearchInputBase
          value={searchDebounce}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
            setSearchDebounce(event.target.value)
          }
          placeholder={'Buscar paradas'}
        />
      </div>
      <StoppingList stoppingQuery={stoppingQuery} />
    </div>
  );
};
