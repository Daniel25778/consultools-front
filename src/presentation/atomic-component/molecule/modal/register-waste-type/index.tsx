import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { WasteType } from 'domain/models/waste-type';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { RegisterWasteTypeForm } from '../../form/waste-type';

interface RegisterWasteTypeModalProps {
  modal: useModalProps;
  wasteType?: WasteType;
}

export const RegisterWasteTypeModal: FC<RegisterWasteTypeModalProps> = ({ modal, wasteType }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        wasteType ? (
          <IconButton
            style={{ backgroundColor: colors.blue[50], padding: '4px', borderRadius: '10%' }}
            onClick={openModal}
          >
            <Edit className={'text-primary'} />
          </IconButton>
        ) : (
          <Button onClick={openModal} variant={'contained'} className={'gap-4'}>
            <Add className={'text-white'} />
            <span>Novo tipo de resíduo</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha as informações do tipo de resíduo.'}
      title={wasteType ? 'Editar tipo de resíduo' : 'Novo tipo de resíduo'}
    >
      <RegisterWasteTypeForm closeModal={closeModal} wasteType={wasteType} />
    </Modal>
  );
};
