import { useModal } from 'data/hooks';
import { Status } from 'domain/enums';
import { companyStatusOptions } from 'domain/models';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { RegisterCompanyModal } from 'presentation/atomic-component/molecule/modal';
import { CompanyList } from 'presentation/atomic-component/organism/company-list';
import { type FC, useState } from 'react';
import { useAppSelector } from 'store/index';

export const CompanyContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.company);
  const modal = useModal();
  const [totalElements, setTotalElements] = useState(0);
  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <div className={'w-full flex items-center justify-between'}>
        <h2 className={'text-primary text-2xl font-medium'}>Empresas</h2>
        <RegisterCompanyModal
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

              setFilter('company', {
                status: selectedValue ? (selectedValue as Status) : null
              });
            }}
            placeholder={'Filtrar por status'}
          />
        </div>
      </div>
      <CompanyList setTotalElements={setTotalElements} />
    </div>
  );
};
