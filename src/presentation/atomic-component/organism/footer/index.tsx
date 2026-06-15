import { Email } from '@mui/icons-material';
import { colors } from 'presentation/style/palette';
import React from 'react';
import { useAppSelector } from 'store/index';

const Footer: React.FC = () => {
  const { sidebarOpen } = useAppSelector((state) => state.persist);

  return (
    <footer
      style={{ boxShadow: '0px -4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'w-full dark:bg-gray-900 py-4 border-t'}
    >
      <div
        className={
          'mx-auto px-4 gap-2 flex-col tablet:px-[150px] tablet:flex-row flex items-center justify-between dark:text-gray-400'
        }
      >
        <a
          href={'mailto:contato@consultools.com'}
          className={`flex items-center gap-2 hover:underline ${sidebarOpen ? 'tablet:ml-[150px]' : 'ml-0'} transition-all duration-200`}
          aria-label={'Fale com a Consultools'}
        >
          <Email style={{ color: colors.primary }} />
          <span className={'text-primary font-medium text-sm'}>FALE COM A CONSULTOOLS</span>
        </a>

        <span className={'text-primary font-medium text-sm'}>
          Todos os direitos reservados © Consultools {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
