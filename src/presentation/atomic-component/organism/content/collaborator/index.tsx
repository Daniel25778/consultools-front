import { useModal, useSearch } from 'data/hooks';
import { Status } from 'domain/enums';
import { companyStatusOptions } from 'domain/models';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterCollaboratorModal } from 'presentation/atomic-component/molecule/modal/register-collaborator';
import { CollaboratorList } from 'presentation/atomic-component/organism';
import { type FC, useEffect, useState } from 'react';
import { useAppSelector } from 'store/index';

export const CollaboratorContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.collaborator);
  const modal = useModal();
  const [totalElements, setTotalElements] = useState(0);
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  useEffect(() => {
    setFilter('collaborator', {
      search
    });
  }, [search]);

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
          placeholder={'Buscar colaboradores'}
        />
        <RegisterCollaboratorModal
          modal={{
            ...modal,
            closeModal() {
              modal.closeModal();
            }
          }}
        />
      </div>
      <div className={'flex items-end justify-between'}>
        <p className={'hidden tablet:block text-gray-500 dark:text-gray-400'}>
          Exibindo um total de {totalElements} resultado{totalElements > 1 ? 's' : ''}
        </p>

        <p className={'block tablet:hidden text-gray-500 dark:text-gray-400'}>
          Total de {totalElements} {totalElements > 1 ? 'itens' : 'item'}
        </p>
        <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
          <Select
            id={''}
            options={companyStatusOptions}
            value={companyStatusOptions.find((option) => option.value === (status ?? '')) ?? null}
            onChange={(event) => {
              const newValue = event as SelectValues | SelectValues[] | null;
              const selectedValue = Array.isArray(newValue) ? newValue[0]?.value : newValue?.value;

              setFilter('collaborator', {
                status: selectedValue ? (selectedValue as Status) : null
              });
            }}
            placeholder={'Filtrar por status'}
          />
        </div>
      </div>
      <CollaboratorList setTotalElements={setTotalElements} />
    </div>
  );
};
