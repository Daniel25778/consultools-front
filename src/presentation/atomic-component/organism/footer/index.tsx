import { Email } from '@mui/icons-material';
import { colors } from 'presentation/style/palette';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      style={{ boxShadow: '0px -4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'w-full dark:bg-gray-900 py-4 '}
    >
      <div
        className={
          'mx-auto px-4 gap-2 flex-col tablet:px-[150px] tablet:flex-row flex items-center justify-between dark:text-gray-400'
        }
      >
        <a
          href={'mailto:contato@consultools.com'}
          className={'flex items-center gap-2 hover:underline'}
          aria-label={'Fale com a Consultools'}
        >
          <Email style={{ color: colors.primary }} />
          <span className={'text-primary font-medium text-sm'}>FALE COM A CONSULTOOLS</span>
        </a>

        <Link to={'/'} className={'text-primary font-medium text-sm'}>
          Todos os direitos reservados © Consultools {new Date().getFullYear()}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
