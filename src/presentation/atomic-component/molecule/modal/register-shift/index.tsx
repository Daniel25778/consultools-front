import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { Shift } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { RegisterShiftForm } from '../../form';

interface RegisterShiftModalProps {
  modal: useModalProps;
  shift?: Shift;
}

export const RegisterShiftModal: FC<RegisterShiftModalProps> = ({ modal, shift }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        shift ? (
          <IconButton
            style={{ backgroundColor: colors.blue[50], padding: '4px', borderRadius: '10%' }}
            onClick={openModal}
          >
            <Edit className={'text-primary'} />
          </IconButton>
        ) : (
          <Button
            onClick={openModal}
            variant={'contained'}
            className={'gap-4 w-full tablet:w-auto'}
          >
            <Add className={'text-white'} />
            <span>Novo turno</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha as informações do turno.'}
      title={shift ? 'Editar turno' : 'Novo turno'}
    >
      <RegisterShiftForm closeModal={closeModal} shift={shift} />
    </Modal>
  );
};
