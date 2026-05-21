import { ArrowRightAlt } from '@mui/icons-material';
import { Status } from 'domain/enums';
import { apiPaths } from 'main/config';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { StatusBadge } from '../..';

interface ConsultantCardProps {
  id: string;
  name: string;
  email: string;
  onClick: () => void;
  status: Status;
}

export const ConsultantCard: FC<ConsultantCardProps> = ({ id, name, email, status, onClick }) => {
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{name}</h3>
          <p className={'text-base text-gray-400 font-medium'}>{email}</p>
        </div>
        <DeleteConfirmationModal
          id={id}
          title={'Remover consultor'}
          text={'Deseja realmente remover o consultor? Todos os dados serão perdidos.'}
          route={apiPaths.user}
          queryName={'user'}
          color={'error'}
          successMessage={'Consultor removido com sucesso!'}
        />
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={status} />
        <div
          onClick={onClick}
          className={
            'text-primary font-medium flex items-center justify-center gap-1 cursor-pointer'
          }
        >
          <p>Ver Detalhes</p>
          <ArrowRightAlt className={'text-primary'} />
        </div>
      </div>
    </div>
  );
};
