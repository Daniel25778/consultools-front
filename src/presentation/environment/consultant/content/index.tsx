import { useInfiniteScroll, useModal } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions } from 'domain/models/status';
import type { User } from 'domain/models/user';
import { apiPaths } from 'main/config/paths';
import { QueryName } from 'main/config/query-list';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { RegisterConsultantModal } from 'presentation/atomic-component/molecule/modal/register-consultant';
import { ConsultantList } from 'presentation/atomic-component/organism';
import { type FC } from 'react';
import { useAppSelector } from 'store/index';

export const ConsultantContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.user);
  const modal = useModal();

  const userQuery = useInfiniteScroll<User>({
    filters: {
      status: status
    },
    limit: 20,
    queryName: QueryName.user,
    route: apiPaths.user
  });
  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <div className={'w-full flex items-center justify-between'}>
        <h2 className={'text-primary text-2xl font-medium'}>Consultores</h2>
        <RegisterConsultantModal
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
          Exibindo {userQuery.data?.length} de um total de {userQuery.pagination?.totalElements}{' '}
          {userQuery.pagination?.totalElements && userQuery.pagination?.totalElements > 1
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

              setFilter('user', {
                status: selectedValue ? (selectedValue as Status) : null
              });
            }}
            placeholder={'Filtrar por status'}
          />
        </div>
      </div>
      <ConsultantList userQuery={userQuery} />
    </div>
  );
};
