import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { StoppingReason } from 'domain/models';
import { apiPaths } from 'main/config';
import {
  RegisterStoppingReasonModal,
  StoppingReasonModal
} from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { StatusBadge } from '../..';

interface StoppingReasonCardProps {
  stoppingReason: StoppingReason;
}

export const StoppingReasonCard: FC<StoppingReasonCardProps> = ({ stoppingReason }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{stoppingReason.name}</h3>
          <p className={'text-sm text-gray-400 line-clamp-1'}>{stoppingReason.description}</p>
        </div>
        <div className={'flex gap-2'}>
          <RegisterStoppingReasonModal
            stoppingReason={stoppingReason}
            modal={{
              ...modalRegister,
              closeModal() {
                modalRegister.closeModal();
              }
            }}
          />
          <DeleteConfirmationModal
            id={stoppingReason.id}
            title={'Remover motivo de parada'}
            text={'Deseja realmente remover o motivo de parada? Todos os dados serão perdidos.'}
            route={apiPaths.stoppingReason}
            queryName={'stoppingReason'}
            color={'error'}
            successMessage={'Motivo de parada removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={stoppingReason.status} />
        <StoppingReasonModal
          stoppingReason={stoppingReason}
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
