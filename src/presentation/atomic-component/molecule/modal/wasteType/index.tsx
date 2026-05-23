import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import type { WasteType } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';

interface WasteTypeModalProps {
  modal: useModalProps;
  openModalElement: React.ReactNode;
  wasteType: WasteType;
}

export const WasteTypeModal: FC<WasteTypeModalProps> = ({ modal, openModalElement, wasteType }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={openModalElement}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'thin'}
      subtitle={''}
      title={'Detalhes de tipo de resíduo'}
    >
      <div className={'flex flex-col gap-4 '}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Código</h1>
          <p>{wasteType?.code}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Nome</h1>
          <p>{wasteType?.name}</p>
        </div>
        <div className={'flex flex-col gap-2 w-full'}>
          <h1 className={'text-primary font-semibold'}>Descrição</h1>
          <p title={wasteType.description} className={'line-clamp-4'}>
            {wasteType?.description}
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
