import { Button } from '@mui/material';
import { roleRoutes } from 'domain/enums';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const NotFound: FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.persist);

  return (
    <div className={'flex flex-col gap-4 items-center justify-center w-full h-screen'}>
      <p className={'text-l font-medium'}>Página não encontrada</p>
      <Button
        onClick={() =>
          navigate(user ? roleRoutes[user.role]?.replace('redirect', user.companyId) : '/')
        }
      >
        Voltar para a página inicial
      </Button>
    </div>
  );
};
