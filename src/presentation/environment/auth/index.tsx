import { ToggleTheme } from 'presentation/atomic-component/atom';
import { UserLoginForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const AuthContent: FC = () => {
  return (
    <div
      className={
        'w-full tablet:w-[380px] mx-auto bg-white dark:bg-gray-800 p-8 rounded-md relative'
      }
    >
      <span className={'absolute right-4 top-4'}>
        <ToggleTheme />
      </span>
      <UserLoginForm />
    </div>
  );
};
