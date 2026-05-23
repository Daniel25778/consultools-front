import { useModal, useSearch } from 'data/hooks';
import { setFilter } from 'main/utils';
import { SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterWasteTypeModal } from 'presentation/atomic-component/molecule/modal/register-waste-type';
import { WasteTypeList } from 'presentation/atomic-component/organism/list/waste-type';
import { type FC, useEffect, useState } from 'react';

export const WasteTypeContent: FC = () => {
  const modal = useModal();
  const [totalElements, setTotalElements] = useState(0);
  const { search, setSearchDebounce, searchDebounce } = useSearch();

  useEffect(() => {
    setFilter('wasteType', { search });
  }, [search]);

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800 rounded-md flex'}>
      <div
        className={
          'w-full flex flex-col-reverse items-end gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <SearchInputBase
          value={searchDebounce}
          onChange={(event) => setSearchDebounce(event.target.value)}
          placeholder={'Buscar tipos de resíduo'}
        />
        <RegisterWasteTypeModal modal={modal} />
      </div>
      <div className={'flex items-end justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo um total de {totalElements} resultado{totalElements !== 1 ? 's' : ''}
        </p>
      </div>
      <WasteTypeList setTotalElements={setTotalElements} />
    </div>
  );
};
