import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { Collaborator } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { RegisterCollaboratorForm } from '../../form';

interface RegisterCollaboratorModalProps {
  modal: useModalProps;
  collaborator?: Collaborator;
}

export const RegisterCollaboratorModal: FC<RegisterCollaboratorModalProps> = ({
  modal,
  collaborator
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        collaborator ? (
          <IconButton
            href={''}
            style={{ backgroundColor: colors.blue[50], padding: '4px', borderRadius: '10%' }}
            onClick={openModal}
          >
            <Edit className={'hover:cursor-pointer text-primary'} />
          </IconButton>
        ) : (
          <Button onClick={openModal} variant={'contained'} className={'gap-4 w-full'}>
            <Add className={'hover:cursor-pointer text-gray-500'} />
            <span>Novo colaborador</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Novo colaborador'}
    >
      <RegisterCollaboratorForm closeModal={closeModal} collaborator={collaborator} />
    </Modal>
  );
};
