import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { Waste } from 'domain/models';
import { apiPaths } from 'main/config';
import { formatCompactNumber } from 'main/utils';
import { RegisterWasteModal, WasteModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';

interface WasteCardProps {
  waste: Waste;
  companyId?: string;
}

export const WasteCard: FC<WasteCardProps> = ({ waste, companyId }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{waste?.wasteType?.name}</h3>
          <p className={'text-sm text-gray-400 line-clamp-1'}>{waste.wasteType.description}</p>
        </div>
        <div className={'flex gap-2'}>
          <RegisterWasteModal
            waste={waste}
            companyId={companyId}
            modal={{
              ...modalRegister,
              closeModal() {
                modalRegister.closeModal();
              }
            }}
          />
          <DeleteConfirmationModal
            id={waste.id}
            title={'Remover refugo'}
            text={'Deseja realmente remover o refugo? Todos os dados serão perdidos.'}
            route={apiPaths.waste}
            queryName={'waste'}
            color={'error'}
            successMessage={'Refugo removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <span className={'text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500'}>
          {formatCompactNumber(waste.quantity)}{' '}
          {waste?.quantity && waste?.quantity > 1 ? 'refugados' : 'refugado'}
        </span>
        <WasteModal
          waste={waste}
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
