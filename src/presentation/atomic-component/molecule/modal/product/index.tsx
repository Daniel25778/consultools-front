import { Button } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import { Status, statusTranslate } from 'domain/enums';
import type { Product } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';

interface ProductModalProps {
  modal: useModalProps;
  openModalElement: React.ReactNode;
  product: Product;
}

export const ProductModal: FC<ProductModalProps> = ({ modal, openModalElement, product }) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      openModalElement={openModalElement}
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'thin'}
      subtitle={''}
      title={'Detalhes do produto'}
    >
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Status</h1>
          <p
            className={`${product?.status === Status.ENABLED ? 'text-dark-green' : 'text-gray-400'} text-base font-medium`}
          >
            {statusTranslate[product?.status ?? Status.DISABLED]}
          </p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Nome</h1>
          <p>{product?.name}</p>
        </div>

        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Unidade de medida</h1>
          <p>{product?.measurementUnit.name}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-primary font-semibold'}>Descrição</h1>
          <p>{product?.description}</p>
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
