import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { Collaborator } from 'domain/models';
import { apiPaths } from 'main/config';
import { CollaboratorModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import { RegisterCollaboratorModal } from 'presentation/atomic-component/molecule/modal/register-collaborator';
import type { FC } from 'react';
import { StatusBadge } from '../..';

interface CollaboratorCardProps {
  collaborator: Collaborator;
}

export const CollaboratorCard: FC<CollaboratorCardProps> = ({ collaborator }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{collaborator.name}</h3>
          <p className={'text-base text-gray-400 font-medium'}>{collaborator.email}</p>
        </div>
        <div className={'flex gap-2'}>
          <RegisterCollaboratorModal
            collaborator={collaborator}
            modal={{
              ...modalRegister,
              closeModal() {
                modalRegister.closeModal();
              }
            }}
          />
          <DeleteConfirmationModal
            id={collaborator.id}
            title={'Remover colaborador'}
            text={'Deseja realmente remover o colaborador? Todos os dados serão perdidos.'}
            route={apiPaths.collaborator}
            queryName={'collaborator'}
            color={'error'}
            successMessage={'Colaborador removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={collaborator.status} />
        <CollaboratorModal
          collaborator={collaborator}
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
