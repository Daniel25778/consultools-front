import { ArrowRightAlt } from '@mui/icons-material';
import { Status } from 'domain/enums';
import { apiPaths } from 'main/config';
import { formatDate } from 'main/utils/format-date';
import { formatCNPJ } from 'main/utils/format-number';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { getUser } from 'store/persist/selector';
import { StatusBadge } from '../..';

interface CompanyCardProps {
  id: string;
  name: string;
  cnpj: string;
  createdAt: string;
  onClick: () => void;
  status: Status;
}

export const CompanyCard: FC<CompanyCardProps> = ({
  id,
  name,
  cnpj,
  createdAt,
  status,
  onClick
}) => {
  const user = getUser();
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col  w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-lg font-semibold text-primary'}>{name}</h3>
          <p className={'text-base text-gray-400 font-medium'}>{formatCNPJ(cnpj)}</p>
        </div>
        {user.role !== 'ADMIN' ? (
          <DeleteConfirmationModal
            id={id}
            title={'Remover empresa'}
            text={'Deseja realmente remover a empresa? Todos os dados serão perdidos.'}
            route={apiPaths.company}
            queryName={'company'}
            color={'error'}
            successMessage={'Empresa removida com sucesso!'}
          />
        ) : (
          <p className={'text-base text-gray-400 font-medium'}>{formatDate(createdAt)}</p>
        )}
      </div>
      <div className={'flex justify-between items-center'}>
        <StatusBadge status={status} />
        {user.role !== 'ADMIN' && (
          <div
            onClick={onClick}
            className={'text-primary font-medium flex items-center gap-1 cursor-pointer'}
          >
            <p>Ver Detalhes</p>
            <ArrowRightAlt className={'text-primary'} />
          </div>
        )}
      </div>
    </div>
  );
};
