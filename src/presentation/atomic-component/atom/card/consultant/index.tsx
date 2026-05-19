import { ArrowRightAlt } from '@mui/icons-material';
import { Status, statusTranslate } from 'domain/enums';
import { apiPaths } from 'main/config';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';

interface ConsultantCardProps {
  name: string;
  email: string;
  status: Status;
}

export const ConsultantCard: FC<ConsultantCardProps> = ({ name, email, status }) => {
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{name}</h3>
          <p className={'text-base text-gray-400 font-semibold'}>{email}</p>
        </div>
        <DeleteConfirmationModal
          id={name}
          title={'Remover consultor'}
          text={'Deseja realmente remover o consultor? Todos os dados serão perdidos.'}
          route={apiPaths.user}
          queryName={'user'}
          successMessage={'Consultor removido com sucesso!'}
        />
      </div>
      <div className={'flex justify-between items-center'}>
        <span
          className={`flex max-w-min px-5 py-1 rounded-full text-base font-semibold ${status === Status.ENABLED ? 'bg-light-green text-dark-green' : 'bg-lightRed text-red'}`}
        >
          {statusTranslate[status]}
        </span>
        <div
          className={
            'text-primary font-medium flex items-center justify-center gap-1 cursor-pointer'
          }
        >
          <p>Ver detalhes</p>
          <ArrowRightAlt className={'text-primary'} />
        </div>
      </div>
    </div>
  );
};
