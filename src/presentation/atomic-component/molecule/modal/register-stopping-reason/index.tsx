import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { StoppingReason } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { RegisterStoppingReasonForm } from '../../form';

interface RegisterStoppingReasonModalProps {
  modal: useModalProps;
  stoppingReason?: StoppingReason;
}

export const RegisterStoppingReasonModal: FC<RegisterStoppingReasonModalProps> = ({
  modal,
  stoppingReason
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        stoppingReason ? (
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
            <span>Novo motivo de parada</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Novo motivo de parada'}
    >
      <RegisterStoppingReasonForm closeModal={closeModal} stoppingReason={stoppingReason} />
    </Modal>
  );
};
