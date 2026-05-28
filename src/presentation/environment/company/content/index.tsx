import { useInfiniteScroll, useModal } from 'data/hooks';
import { Status } from 'domain/enums';
import { companyStatusOptions, type Company } from 'domain/models';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { RegisterCompanyModal } from 'presentation/atomic-component/molecule/modal';
import { CompanyList } from 'presentation/atomic-component/organism';
import { type FC } from 'react';
import { useAppSelector } from 'store/index';

export const CompanyContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.company);
  const modal = useModal();
  const { user } = useAppSelector((state) => state.persist);
  const companyQuery = useInfiniteScroll<Company>({
    filters: {
      status: status,
      userId: user?.id
    },
    limit: 20,
    queryName: QueryName.company,
    route: apiPaths.company
  });
  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800 rounded-md flex '}>
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
      <div className={'flex items-end flex-col-reverse gap-4 tablet:flex-row justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {companyQuery.data?.length} de um total de{' '}
          {companyQuery.pagination?.totalElements}{' '}
          {companyQuery.pagination?.totalElements && companyQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
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
      <CompanyList companyQuery={companyQuery} />
    </div>
  );
};
