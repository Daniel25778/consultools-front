import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions, type Collaborator } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { FloatButton } from 'presentation/atomic-component/atom';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterCollaboratorModal } from 'presentation/atomic-component/molecule/modal/register-collaborator';
import { CollaboratorList } from 'presentation/atomic-component/organism';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const CollaboratorContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.collaborator);
  const { removeItems } = useRemoveItems();
  const { companyId } = useParams() as { companyId: string };

  const modal = useModal();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  useEffect(() => {
    setFilter('collaborator', {
      search
    });
  }, [search]);

  const collaboratorQuery = useInfiniteScroll<Collaborator>({
    filters: {
      status: status,
      search: search,
      companyId
    },
    limit: 30,
    queryName: QueryName.collaborator,
    route: apiPaths.collaborator
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <Breadcrumbs
        replaceItems={{ [companyId]: 'Detalhes de empresa' }}
        removeItems={removeItems}
      />
      <div
        className={
          'hidden tablet:flex w-full flex-col gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <h2 className={'text-primary text-2xl font-medium'}>Colaboradores</h2>
        <div>
          <RegisterCollaboratorModal
            modal={{
              ...modal,
              closeModal() {
                modal.closeModal();
              }
            }}
          />
        </div>
      </div>
      <div className={'flex flex-col gap-4 items-end justify-between tablet:flex-row'}>
        <p className={'hidden tablet:flex text-gray-500 dark:text-gray-400 w-full'}>
          Exibindo {collaboratorQuery.data?.length} de um total de{' '}
          {collaboratorQuery.pagination?.totalElements}{' '}
          {collaboratorQuery.pagination?.totalElements &&
          collaboratorQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <div className={'flex justify-between w-full tablet:hidden'}>
          <h2 className={'flex tablet:hidden text-primary text-2xl font-medium'}>Colaboradores</h2>
          <p
            className={'flex tablet:hidden text-primary text-lg font-semibold dark:text-gray-400 '}
          >
            {collaboratorQuery.data?.length} de {''}
            {collaboratorQuery.pagination?.totalElements}
          </p>
        </div>
        <div className={'flex w-full justify-end items-end  gap-4 flex-col tablet:flex-row'}>
          <SearchInputBase
            value={searchDebounce}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
              setSearchDebounce(event.target.value)
            }
            placeholder={'Buscar colaboradores'}
          />
          <div className={'flex w-full tablet:min-w-[256px] tablet:max-w-[256px]'}>
            <Select
              id={''}
              options={statusOptions}
              value={statusOptions.find((option) => option.value === (status ?? '')) ?? null}
              onChange={(event) => {
                const newValue = event as SelectValues | SelectValues[] | null;
                const selectedValue = Array.isArray(newValue)
                  ? newValue[0]?.value
                  : newValue?.value;

                setFilter('collaborator', {
                  status: selectedValue ? (selectedValue as Status) : null
                });
              }}
              placeholder={'Filtrar por status'}
            />
          </div>
        </div>
      </div>
      <FloatButton modal={modal} />
      <CollaboratorList collaboratorQuery={collaboratorQuery} />
    </div>
  );
};
