import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { Stopping } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { RegisterStoppingForm } from '../../form';

interface RegisterStoppingModalProps {
  modal: useModalProps;
  stopping?: Stopping;
  companyId?: string;
}

export const RegisterStoppingModal: FC<RegisterStoppingModalProps> = ({
  modal,
  stopping,
  companyId
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        stopping ? (
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
            <span>Nova parada</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Nova parada'}
    >
      <RegisterStoppingForm closeModal={closeModal} stopping={stopping} companyId={companyId} />
    </Modal>
  );
};
