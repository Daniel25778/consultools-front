import { Terms } from 'presentation/atomic-component/atom/terms';
import { ChangePasswordForm } from 'presentation/atomic-component/molecule/form/user/change-password';
import type { FC } from 'react';

export const ChangePasswordContent: FC = () => {
  return (
    <div
      className={
        'w-full tablet:w-[600px] mx-auto bg-white dark:bg-gray-800 p-6 tablet:p-12 rounded-md flex flex-col gap-6 tablet:gap-10'
      }
    >
      <img alt={'Consultools Logo'} className={'mx-auto w-28 tablet:w-auto'} src={'/logo.png'} />
      <ChangePasswordForm />
      <Terms />
    </div>
  );
};
