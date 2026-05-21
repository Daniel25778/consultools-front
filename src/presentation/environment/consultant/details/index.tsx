import { Button } from '@mui/material';
import { useModal } from 'data/hooks/use-modal';
import { Status, statusTranslate } from 'domain/enums';
import { useFindOneUserQuery } from 'infra/cache';
import { apiPaths } from 'main/config/paths';
import { formatCPF } from 'main/utils';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { RegisterConsultantModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { CompanyContent } from 'presentation/environment/company';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';

export const ConsultantContentDetails: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const userQuery = useFindOneUserQuery({ id }).data;
  const modal = useModal();

  return (
    <div className={'flex w-full flex-col  gap-5 '}>
      <Breadcrumbs replaceItems={{ [id]: 'Detalhes de Consultor' }} />
      <div
        className={
          'flex flex-col tablet:flex-row w-full bg-white rounded p-6 tablet:p-8 items-start tablet:items-center justify-between gap-6'
        }
      >
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-center gap-2'}>
            <h1 className={'text-primary text-xl tablet:text-2xl font-semibold break-words'}>
              {userQuery?.name}
            </h1>
            <RegisterConsultantModal
              user={userQuery}
              modal={{
                ...modal,
                closeModal() {
                  modal.closeModal();
                }
              }}
            />
          </div>
          <div className={'flex flex-wrap items-center gap-x-3 gap-y-1'}>
            <p className={'text-gray-400 text-base font-medium'}>{userQuery?.email}</p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>{formatCPF(userQuery?.cpf)}</p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p
              className={`${userQuery?.status === Status.ENABLED ? 'text-dark-green' : 'text-gray-400'} text-base font-medium`}
            >
              {statusTranslate[userQuery?.status ?? Status.DISABLED]}
            </p>
          </div>
        </div>
        <div className={'flex w-full tablet:w-auto tablet:min-w-max'}>
          <DeleteConfirmationModal
            id={id}
            openElement={
              <Button variant={'contained'} color={'error'} className={'w-full tablet:w-auto'}>
                Remover consultor
              </Button>
            }
            title={'Remover consultor'}
            text={'Deseja realmente remover o consultor? Todos os dados serão perdidos.'}
            route={apiPaths.user}
            queryName={'user'}
            color={'error'}
            successMessage={'Consultor removido com sucesso!'}
          />
        </div>
      </div>
      <CompanyContent />
    </div>
  );
};
