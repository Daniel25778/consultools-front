import { paths } from 'main/config';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const Terms: FC = () => {
  return (
    <div className={'flex flex-col w-full items-center px-0 tablet:px-14'}>
      <span className={'text-center text-gray-500 dark:text-gray-400'}>
        Ao acessar o sistema, você concorda com nossos{' '}
        <Link to={paths.termsOfUse} target={'_blank'} className={'text-primary underline'}>
          Termos de Uso
        </Link>{' '}
        e{' '}
        <Link to={paths.privacyPolicy} target={'_blank'} className={'text-primary underline'}>
          Política de Privacidade
        </Link>
        .
      </span>
    </div>
  );
};
