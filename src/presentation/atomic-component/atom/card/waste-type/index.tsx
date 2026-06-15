import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { WasteType } from 'domain/models/waste-type';
import { apiPaths, QueryName } from 'main/config';
import { WasteTypeModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import { RegisterWasteTypeModal } from 'presentation/atomic-component/molecule/modal/register-waste-type';
import type { FC } from 'react';

interface WasteTypeCardProps {
  wasteType: WasteType;
}

export const WasteTypeCard: FC<WasteTypeCardProps> = ({ wasteType }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[370px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3
            className={'text-lg font-semibold text-primary cursor-pointer'}
            onClick={modalDetails.openModal}
          >
            {wasteType.name}
          </h3>
          <p className={'text-sm text-gray-400 line-clamp-1'}>{wasteType.description}</p>
        </div>
        <div className={'flex gap-2'}>
          <RegisterWasteTypeModal wasteType={wasteType} modal={modalRegister} />
          <DeleteConfirmationModal
            id={wasteType.id}
            title={'Remover tipo de refugo'}
            text={'Deseja realmente remover este tipo de refugo?'}
            route={apiPaths.wasteType}
            queryName={QueryName.wasteType}
            color={'error'}
            successMessage={'Tipo de refugo removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <span className={'text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500'}>
          {wasteType.code}
        </span>
        <WasteTypeModal
          wasteType={wasteType}
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
