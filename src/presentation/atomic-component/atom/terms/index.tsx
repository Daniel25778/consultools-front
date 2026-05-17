import type { FC } from 'react';

export const Terms: FC = () => {
  return (
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
  );
};
