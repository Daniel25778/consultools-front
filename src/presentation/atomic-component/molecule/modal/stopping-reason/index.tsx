import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import { Nature, natureTranslate, Status, statusTranslate } from 'domain/enums';
import type { StoppingReason } from 'domain/models';
import { useFindOneStoppingReasonQuery } from 'infra/cache/queries/stopping-reason';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';

interface StoppingReasonModalProps {
  modal: useModalProps;
  openModalElement: React.ReactNode;
  stoppingReason: StoppingReason;
}

export const StoppingReasonModal: FC<StoppingReasonModalProps> = ({
  modal,
  openModalElement,
  stoppingReason
}) => {
  const { closeModal, isOpen, openModal } = modal;

  const stoppingReasonDetailsQuery = useFindOneStoppingReasonQuery({ id: stoppingReason.id }).data;

  return (
    <Modal
      openModalElement={openModalElement}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={''}
      title={'Detalhes de motivos de parada'}
    >
      <div className={'flex flex-col gap-4'}>
        <div className={'flex w-full gap-10'}>
          <div className={'flex flex-col gap-2 w-full'}>
            <h1 className={'text-primary font-semibold'}>Status</h1>
            <p
              className={`${stoppingReasonDetailsQuery?.status === Status.ENABLED ? 'text-dark-green' : 'text-gray-400'} text-base line-clamp-1 font-medium`}
            >
              {statusTranslate[stoppingReasonDetailsQuery?.status ?? Status.DISABLED]}
            </p>
          </div>
          <div className={'flex flex-col gap-2 w-full'}>
            <h1 className={'text-primary font-semibold'}>Nome</h1>
            <p title={stoppingReasonDetailsQuery?.name} className={'line-clamp-1'}>
              {stoppingReasonDetailsQuery?.name}
            </p>
          </div>
        </div>
        <div className={'flex gap-10'}>
          <div className={'flex flex-col gap-2 w-full'}>
            <h1 className={'text-primary font-semibold'}>Natureza</h1>
            <p>{natureTranslate[stoppingReasonDetailsQuery?.nature ?? Nature.PLANNED]}</p>
          </div>
          <div className={'flex flex-col gap-2 w-full'}>
            <h1 className={'text-primary font-semibold'}>Área responsável</h1>
            <p className={'line-clamp-1'} title={stoppingReasonDetailsQuery?.responsibleArea?.name}>
              {stoppingReasonDetailsQuery?.responsibleArea.name}
            </p>
          </div>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Descrição</h1>
          <p title={stoppingReasonDetailsQuery?.description} className={'line-clamp-5'}>
            {stoppingReasonDetailsQuery?.description}
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
