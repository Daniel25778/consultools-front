import { useModal } from 'data/hooks';
import { RegisterConsultantModal } from 'presentation/atomic-component/molecule/modal/register-consultant';
import { ConsultantList } from 'presentation/atomic-component/organism/consultant-list';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const modal = useModal();
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
      <ConsultantList setTotalElements={(): void => {}} />
    </div>
  );
};
