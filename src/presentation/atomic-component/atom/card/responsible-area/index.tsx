import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { ResponsibleArea } from 'domain/models';
import { apiPaths } from 'main/config';
import {
  RegisterResponsibleAreaModal,
  ResponsibleAreaModal
} from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { StatusBadge } from '../..';

interface ResponsibleAreaCardProps {
  responsibleArea: ResponsibleArea;
}

export const ResponsibleAreaCard: FC<ResponsibleAreaCardProps> = ({ responsibleArea }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{responsibleArea.name}</h3>
        </div>
        <div className={'flex gap-2'}>
          <RegisterResponsibleAreaModal
            responsibleArea={responsibleArea}
            modal={{
              ...modalRegister,
              closeModal() {
                modalRegister.closeModal();
              }
            }}
          />
          <DeleteConfirmationModal
            id={responsibleArea.id}
            title={'Remover área responsável'}
            text={'Deseja realmente remover o área responsável? Todos os dados serão perdidos.'}
            route={apiPaths.responsibleArea}
            queryName={'responsibleArea'}
            color={'error'}
            successMessage={'Área responsável removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={responsibleArea.status} />
        <ResponsibleAreaModal
          responsibleArea={responsibleArea}
          modal={{
            ...modalDetails,
            closeModal() {
              modalDetails.closeModal();
            }
          }}
          openModalElement={
            <div
              onClick={modalDetails.openModal}
              className={
                'text-primary font-medium flex items-center justify-center gap-1 cursor-pointer'
              }
            >
              <p>Ver Detalhes</p>
              <ArrowRightAlt className={'text-primary'} />
            </div>
          }
        />
      </div>
    </div>
  );
};
