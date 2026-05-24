import { useModal } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions } from 'domain/models/status';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { RegisterConsultantModal } from 'presentation/atomic-component/molecule/modal/register-consultant';
import { ConsultantList } from 'presentation/atomic-component/organism';
import { type FC, useState } from 'react';
import { useAppSelector } from 'store/index';

export const ConsultantContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.user);
  const modal = useModal();
  const [totalElements, setTotalElements] = useState(0);
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
      <div className={'flex items-end justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400 mobile:hidden'}>
          Exibindo um total de {totalElements} resultado{totalElements > 1 ? 's' : ''}
        </p>
        <p className={'text-gray-500 dark:text-gray-400 tablet:hidden'}>
          Total de {totalElements} {totalElements > 1 ? 'itens' : 'item'}
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
      <ConsultantList setTotalElements={setTotalElements} />
    </div>
  );
};
