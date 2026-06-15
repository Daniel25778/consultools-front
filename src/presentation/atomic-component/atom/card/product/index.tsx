import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { Product } from 'domain/models';
import { apiPaths } from 'main/config';
import { ProductModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import { RegisterProductModal } from 'presentation/atomic-component/molecule/modal/register-product';
import type { FC } from 'react';
import { StatusBadge } from '../..';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390 px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3
            className={'text-lg font-semibold text-primary cursor-pointer'}
            onClick={modalDetails.openModal}
          >
            {product.name}
          </h3>
        </div>
        <div className={'flex gap-2'}>
          <RegisterProductModal
            product={product}
            modal={{
              ...modalRegister,
              closeModal() {
                modalRegister.closeModal();
              }
            }}
          />
          <DeleteConfirmationModal
            id={product.id}
            title={'Remover produto'}
            text={'Deseja realmente remover o produto? Todos os dados serão perdidos.'}
            route={apiPaths.product}
            queryName={'product'}
            color={'error'}
            successMessage={'Produto removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={product.status} />
        <ProductModal
          product={product}
          modal={{
            ...modalDetails,
            closeModal() {
              modalDetails.closeModal();
            }
          }}
          openModalElement={
            <div
              onClick={modalDetails.openModal}
              className={
                'text-primary font-medium flex items-center justify-center gap-1 cursor-pointer'
              }
            >
              <p>Ver Detalhes</p>
              <ArrowRightAlt className={'text-primary'} />
            </div>
          }
        />
      </div>
    </div>
  );
};
