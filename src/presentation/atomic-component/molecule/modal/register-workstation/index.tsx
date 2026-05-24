import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { Workstation } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { RegisterWorkstationForm } from '../../form';

interface RegisterWorkstationModalProps {
  modal: useModalProps;
  workstation?: Workstation;
}

export const RegisterWorkstationModal: FC<RegisterWorkstationModalProps> = ({
  modal,
  workstation
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        workstation ? (
          <IconButton
            href={''}
            style={{ backgroundColor: colors.blue[50], padding: '4px', borderRadius: '10%' }}
            onClick={openModal}
          >
            <Edit className={'hover:cursor-pointer text-primary'} />
          </IconButton>
        ) : (
          <Button onClick={openModal} variant={'contained'} className={'gap-4'}>
            <Add className={'hover:cursor-pointer text-gray-500'} />
            <span>Novo posto de trabalho</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Novo posto de trabalho'}
    >
      <RegisterWorkstationForm closeModal={closeModal} workstation={workstation} />
    </Modal>
  );
};
