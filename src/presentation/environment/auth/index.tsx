import { UserLoginForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const AuthContent: FC = () => {
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={
        'w-full tablet:w-[600px] mx-auto bg-white  dark:bg-gray-800 p-6 tablet:p-12 rounded-md flex flex-col gap-6 tablet:gap-10'
      }
    >
      <img alt={'Consultools Logo'} className={'mx-auto w-28 tablet:w-auto'} src={'/logo.png'} />
      <UserLoginForm />
      <div className={'flex flex-col w-full items-center px-0 tablet:px-14'}>
        <span className={'text-center text-gray-500 dark:text-gray-400'}>
          Ao acessar o sistema, você concorda com nossos{' '}
          <a href={'/'} className={'text-primary underline'}>
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href={'/'} className={'text-primary underline'}>
            Política de Privacidade
          </a>
          .
        </span>
      </div>
    </div>
  );
};
