import { useInfiniteScroll, useModal, useSearch } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions, type Workstation } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterWorkstationModal } from 'presentation/atomic-component/molecule/modal';
import { WorkstationList } from 'presentation/atomic-component/organism';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const WorkstationContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.workstation);
  const modal = useModal();
  const { id = '' } = useParams<{ id: string }>();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  useEffect(() => {
    setFilter('workstation', {
      search
    });
  }, [search]);
  const workstationQuery = useInfiniteScroll<Workstation>({
    filters: {
      status: status,
      search: search,
      companyId: id
    },
    limit: 20,

    queryName: QueryName.workstation,
    route: apiPaths.workstation
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <div
        className={
          'w-full flex flex-col-reverse items-end gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <SearchInputBase
          value={searchDebounce}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
            setSearchDebounce(event.target.value)
          }
          placeholder={'Buscar posto de trabalho'}
        />
        <RegisterWorkstationModal
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
          Exibindo {workstationQuery.data?.length} de um total de{' '}
          {workstationQuery.pagination?.totalElements}{' '}
          {workstationQuery.pagination?.totalElements &&
          workstationQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>
        <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
          <Select
            id={''}
            options={statusOptions}
            value={statusOptions.find((option) => option.value === (status ?? '')) ?? null}
            onChange={(event) => {
              const newValue = event as SelectValues | SelectValues[] | null;
              const selectedValue = Array.isArray(newValue) ? newValue[0]?.value : newValue?.value;

              setFilter('workstation', {
                status: selectedValue ? (selectedValue as Status) : null
              });
            }}
            placeholder={'Filtrar por status'}
          />
        </div>
      </div>
      <WorkstationList workstationQuery={workstationQuery} />
    </div>
  );
};
