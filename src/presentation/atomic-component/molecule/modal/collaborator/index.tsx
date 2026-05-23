import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import { Status, statusTranslate } from 'domain/enums';
import type { Collaborator } from 'domain/models';
import { formatCPF } from 'main/utils';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';

interface CollaboratorModalProps {
  modal: useModalProps;
  openModalElement: React.ReactNode;
  collaborator: Collaborator;
}

export const CollaboratorModal: FC<CollaboratorModalProps> = ({
  modal,
  openModalElement,
  collaborator
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={openModalElement}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'thin'}
      subtitle={''}
      title={'Detalhes de colaborador'}
    >
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Status</h1>
          <p
            className={`${collaborator?.status === Status.ENABLED ? 'text-dark-green' : 'text-gray-400'} text-base font-medium`}
          >
            {statusTranslate[collaborator?.status]}
          </p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Nome</h1>
          <p>{collaborator?.name}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Email</h1>
          <p>{collaborator?.email}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>CPF</h1>
          <p>{formatCPF(collaborator?.cpf)}</p>
        </div>
      </div>
      <div
        className={'flex flex-col tablet:flex-row gap-5 tablet:max-w-[394px] w-full mt-4 ml-auto'}
      >
        <Button className={'w-full h-12 tablet:h-auto'} color={'primary'} onClick={closeModal}>
          Fechar
        </Button>
      </div>
    </Modal>
  );
};
