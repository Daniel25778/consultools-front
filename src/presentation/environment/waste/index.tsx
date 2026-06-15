import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import type { Waste } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterWasteModal } from 'presentation/atomic-component/molecule/modal/register-waste';
import { WasteList } from 'presentation/atomic-component/organism/list/waste';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const WasteContent: FC = () => {
  const modal = useModal();
  const { id = '', companyId } = useParams<{ id: string; companyId?: string }>();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { removeItems } = useRemoveItems();

  useEffect(() => {
    setFilter('waste', {
      search
    });
  }, [search]);
  const wasteQuery = useInfiniteScroll<Waste>({
    filters: {
      search: search,
      productionReportingId: id
    },
    limit: 20,
    queryName: QueryName.waste,
    route: apiPaths.waste
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
        <h2 className={'text-primary text-2xl font-medium'}>Refugos</h2>

        <RegisterWasteModal
          modal={{
            ...modal,
            closeModal() {
              modal.closeModal();
            }
          }}
          companyId={companyId}
        />
      </div>
      <div
        className={
          'flex w-full justify-end items-end flex-col-reverse gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {wasteQuery.data?.length} de um total de {wasteQuery.pagination?.totalElements}{' '}
          {wasteQuery.pagination?.totalElements && wasteQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <SearchInputBase
          value={searchDebounce}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
            setSearchDebounce(event.target.value)
          }
          placeholder={'Buscar refugos'}
        />
      </div>
      <WasteList wasteQuery={wasteQuery} companyId={companyId} />
    </div>
  );
};
