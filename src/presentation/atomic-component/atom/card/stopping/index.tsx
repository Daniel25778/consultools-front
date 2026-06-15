import { ArrowRightAlt } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { Stopping } from 'domain/models';
import { apiPaths } from 'main/config';
import { RegisterStoppingModal, StoppingModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { NatureBadge } from '../../status-badge-nature';

interface StoppingCardProps {
  stopping: Stopping;
  companyId?: string;
}

export const StoppingCard: FC<StoppingCardProps> = ({ stopping, companyId }) => {
  const modalRegister = useModal();
  const modalDetails = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390 px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{stopping.stoppingReason?.name}</h3>
          <p className={'text-sm text-gray-400 line-clamp-1'}>
            {stopping.stoppingReason?.description}
          </p>
        </div>
        <div className={'flex gap-2'}>
          <RegisterStoppingModal
            stopping={stopping}
            companyId={companyId}
            modal={{
              ...modalRegister,
              closeModal() {
                modalRegister.closeModal();
              }
            }}
          />
          <DeleteConfirmationModal
            id={stopping.id}
            title={'Remover parada'}
            text={'Deseja realmente remover o parada? Todos os dados serão perdidos.'}
            route={apiPaths.stopping}
            queryName={'stopping'}
            color={'error'}
            successMessage={'Parada removida com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <NatureBadge nature={stopping?.stoppingReason?.nature} />
        <StoppingModal
          stopping={stopping}
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
