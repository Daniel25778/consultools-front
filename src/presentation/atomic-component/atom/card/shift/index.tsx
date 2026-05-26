import { AccessTimeFilled } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import type { Shift } from 'domain/models';
import { apiPaths, QueryName } from 'main/config';
import { formatHour } from 'main/utils';
import { RegisterShiftModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { StatusBadge } from '../../status-badge';

interface ShiftCardProps {
  shift: Shift;
}

export const ShiftCard: FC<ShiftCardProps> = ({ shift }) => {
  const modal = useModal();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[370px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{shift.name}</h3>
        </div>
        <div className={'flex gap-2'}>
          <RegisterShiftModal shift={shift} modal={modal} />
          <DeleteConfirmationModal
            id={shift.id}
            title={'Remover turno'}
            text={'Deseja realmente remover este turno?'}
            route={apiPaths.shift}
            queryName={QueryName.shift}
            color={'error'}
            successMessage={'Turno removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={shift.status} />
        <span
          className={' flex text-sm font-bold bg-gray-100 px-2 py-1 rounded gap-1 text-gray-500'}
        >
          <AccessTimeFilled sx={{ fontSize: '18px' }} />
          <p>
            {formatHour(shift.startTime)} - {formatHour(shift.endTime)}
          </p>
        </span>
      </div>
    </div>
  );
};
