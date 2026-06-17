import { useInfiniteScroll, useModal, useRemoveItems, useSearch } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions, type StoppingReason } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterStoppingReasonModal } from 'presentation/atomic-component/molecule/modal';
import { StoppingReasonList } from 'presentation/atomic-component/organism';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const StoppingReasonContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.stoppingReason);
  const modal = useModal();
  const { companyId } = useParams() as { companyId: string };
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const { removeItems } = useRemoveItems();

  useEffect(() => {
    setFilter('stoppingReason', {
      search
    });
  }, [search]);
  const stoppingReasonQuery = useInfiniteScroll<StoppingReason>({
    filters: {
      status: status,
      search: search,
      companyId
    },
    limit: 30,
    queryName: QueryName.stoppingReason,
    route: apiPaths.stoppingReason
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <Breadcrumbs
        replaceItems={{ [companyId]: 'Detalhes de empresa' }}
        removeItems={removeItems}
      />
      <div
        className={
          'w-full flex flex-col-reverse items-end tablet:items-start gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <h2 className={'text-primary text-2xl font-medium'}>Motivos de parada</h2>
        <RegisterStoppingReasonModal
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
          Exibindo {stoppingReasonQuery.data?.length} de um total de{' '}
          {stoppingReasonQuery.pagination?.totalElements}{' '}
          {stoppingReasonQuery.pagination?.totalElements &&
          stoppingReasonQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>

        <div className={'flex items-end gap-4 flex-col-reverse tablet:flex-row'}>
          <SearchInputBase
            value={searchDebounce}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
              setSearchDebounce(event.target.value)
            }
            placeholder={'Buscar motivos de parada'}
          />
          <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
            <Select
              id={''}
              options={statusOptions}
              value={statusOptions.find((option) => option.value === (status ?? '')) ?? null}
              onChange={(event) => {
                const newValue = event as SelectValues | SelectValues[] | null;
                const selectedValue = Array.isArray(newValue)
                  ? newValue[0]?.value
                  : newValue?.value;

                setFilter('stoppingReason', {
                  status: selectedValue ? (selectedValue as Status) : null
                });
              }}
              placeholder={'Filtrar por status'}
            />
          </div>
        </div>
      </div>
      <StoppingReasonList stoppingReasonQuery={stoppingReasonQuery} />
    </div>
  );
};
