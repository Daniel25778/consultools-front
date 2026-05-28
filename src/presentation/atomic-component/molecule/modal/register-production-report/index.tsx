import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { ProductionReportDetails } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';
import { RegisterProductionReportForm } from '../../form';

interface RegisterProductionReportModalProps {
  modal: useModalProps;
  productionReport?: ProductionReportDetails;
}

export const RegisterProductionReportModal: FC<RegisterProductionReportModalProps> = ({
  modal,
  productionReport
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={
        productionReport ? (
          <IconButton href={''} onClick={openModal}>
            <Edit className={'hover:cursor-pointer text-primary'} />
          </IconButton>
        ) : (
          <Button onClick={openModal} variant={'contained'} className={'gap-4'}>
            <Add className={'hover:cursor-pointer text-gray-500'} />
            <span>Novo apontamento</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Novo apontamento'}
    >
      <RegisterProductionReportForm closeModal={closeModal} productionReport={productionReport} />
    </Modal>
  );
};
