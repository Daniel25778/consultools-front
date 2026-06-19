import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import { Nature, natureTranslate } from 'domain/enums';
import type { Stopping } from 'domain/models';
import { formatDate } from 'main/utils';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';

interface StoppingModalProps {
  modal: useModalProps;
  openModalElement: React.ReactNode;
  stopping: Stopping;
}

export const StoppingModal: FC<StoppingModalProps> = ({ modal, openModalElement, stopping }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={openModalElement}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'thin'}
      subtitle={''}
      title={'Detalhes de parada'}
    >
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Natureza</h1>
          <p
            className={`${stopping?.stoppingReason?.nature === Nature.PLANNED ? 'text-dark-green' : 'text-gray-400'} text-base font-medium`}
          >
            {natureTranslate[stopping?.stoppingReason?.nature]}
          </p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Motivo de parada</h1>
          <p>{stopping?.stoppingReason.name}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Área responsável</h1>
          <p>{stopping?.stoppingReason?.responsibleArea?.name}</p>
        </div>

        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Descrição</h1>
          <p>{stopping?.stoppingReason?.description}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Data de início</h1>
          <p>{formatDate(stopping?.startDate, 'dd/MM/yyyy HH:mm')}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Data de fim</h1>
          <p>{formatDate(stopping?.endDate, 'dd/MM/yyyy HH:mm')}</p>
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
