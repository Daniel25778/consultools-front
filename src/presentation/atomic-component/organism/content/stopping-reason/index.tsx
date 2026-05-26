import { useInfiniteScroll, useModal, useSearch } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions, type StoppingReason } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterStoppingReasonModal } from 'presentation/atomic-component/molecule/modal';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { StoppingReasonList } from '../../list';

export const StoppingReasonContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.stoppingReason);
  const modal = useModal();
  const { id = '' } = useParams<{ id: string }>();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  useEffect(() => {
    setFilter('stoppingReason', {
      search
    });
  }, [search]);
  const stoppingReasonQuery = useInfiniteScroll<StoppingReason>({
    filters: {
      status: status,
      search: search,
      companyId: id
    },
    limit: 20,
    queryName: QueryName.stoppingReason,
    route: apiPaths.stoppingReason
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
          placeholder={'Buscar motivos de parada'}
        />
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
        <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
          <Select
            id={''}
            options={statusOptions}
            value={statusOptions.find((option) => option.value === (status ?? '')) ?? null}
            onChange={(event) => {
              const newValue = event as SelectValues | SelectValues[] | null;
              const selectedValue = Array.isArray(newValue) ? newValue[0]?.value : newValue?.value;

              setFilter('stoppingReason', {
                status: selectedValue ? (selectedValue as Status) : null
              });
            }}
            placeholder={'Filtrar por status'}
          />
        </div>
      </div>
      <StoppingReasonList stoppingReasonQuery={stoppingReasonQuery} />
    </div>
  );
};
