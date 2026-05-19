import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';
import { RegisterConsultantForm } from '../../form/consultant';

interface RegisterConsultantModalProps {
  modal: useModalProps;
}

export const RegisterConsultantModal: FC<RegisterConsultantModalProps> = ({ modal }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        <Button onClick={openModal} variant={'contained'} className={'gap-4'}>
          <Add className={'hover:cursor-pointer text-gray-500'} />
          <span>Novo consultor</span>
        </Button>
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Novo consultor'}
    >
      <RegisterConsultantForm closeModal={closeModal} />
    </Modal>
  );
};
