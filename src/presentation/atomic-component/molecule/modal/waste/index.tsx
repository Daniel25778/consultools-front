import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { Waste } from 'domain/models';
import { formatCompactNumber } from 'main/utils/format-compact-number';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';

interface WasteModalProps {
  modal: useModalProps;
  openModalElement: React.ReactNode;
  waste: Waste;
}

export const WasteModal: FC<WasteModalProps> = ({ modal, openModalElement, waste }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={openModalElement}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'thin'}
      subtitle={''}
      title={'Detalhes de refugo'}
    >
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Código</h1>
          <p>{waste?.wasteType?.code}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Tipo de refugo</h1>
          <p>{waste?.wasteType?.name}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Descrição</h1>
          <p>{waste?.wasteType?.description}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Quantidade</h1>
          <p>
            {formatCompactNumber(waste.quantity)}{' '}
            {waste?.quantity && waste?.quantity > 1 ? 'refugados' : 'refugado'}
          </p>
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
