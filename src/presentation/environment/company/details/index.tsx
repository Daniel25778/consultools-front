import { Button } from '@mui/material';
import { useRemoveItems } from 'data/hooks';
import { useModal } from 'data/hooks/use-modal';
import { Role, Status, statusTranslate } from 'domain/enums';
import { useFindOneCompanyQuery } from 'infra/cache';
import { apiPaths } from 'main/config/paths';
import { formatCNPJ, setFilter } from 'main/utils';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { DashboardGrid } from 'presentation/atomic-component/molecule/dashboard/grid';
import { RegisterCompanyModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useUserLogged } from 'store/persist/selector';

export const CompanyDetails: FC = () => {
  const { companyId } = useParams() as { companyId: string };
  const { data: companyQuery } = useFindOneCompanyQuery({ id: companyId });
  const modal = useModal();
  const { removeItems } = useRemoveItems();
  const { role } = useUserLogged();

  useEffect(() => {
    setFilter('company', {
      userId: companyQuery?.id ? companyQuery.id : undefined
    });
  }, [companyQuery?.id]);

  return (
    <div className={'flex w-full flex-col  gap-5 '}>
      <Breadcrumbs
        replaceItems={{ [companyId]: 'Detalhes de Empresa' }}
        removeItems={removeItems}
      />

      <div
        className={
          'flex flex-col tablet:flex-row w-full bg-white rounded p-6 tablet:p-8 items-start tablet:items-center justify-between gap-6'
        }
      >
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-center gap-2'}>
            <h1 className={'text-primary text-xl tablet:text-2xl font-semibold break-words'}>
              {companyQuery?.name}
            </h1>
            {role === Role.CONSULTANT && (
              <RegisterCompanyModal
                company={companyQuery}
                modal={{
                  ...modal,
                  closeModal() {
                    modal.closeModal();
                  }
                }}
              />
            )}
          </div>
          <div className={'flex flex-wrap items-center gap-x-3 gap-y-1'}>
            <p className={'text-gray-400 text-base font-medium'}>
              {formatCNPJ(companyQuery?.cnpj)}
            </p>
            {role === Role.CONSULTANT && (
              <>
                <p className={'text-gray-400 text-base font-medium'}>•</p>
                <p
                  className={`${companyQuery?.status === Status.ENABLED ? 'text-dark-green' : 'text-gray-400'} text-base font-medium`}
                >
                  {statusTranslate[companyQuery?.status ?? Status.DISABLED]}
                </p>
              </>
            )}
          </div>
        </div>
        {role === Role.CONSULTANT && (
          <div className={'flex w-full tablet:w-auto tablet:min-w-max'}>
            <DeleteConfirmationModal
              id={companyId}
              openElement={
                <Button variant={'contained'} color={'error'} className={'w-full tablet:w-auto'}>
                  Remover empresa
                </Button>
              }
              title={'Remover empresa'}
              text={'Deseja realmente remover a empresa? Todos os dados serão perdidos.'}
              route={apiPaths.company}
              queryName={'company'}
              color={'error'}
              successMessage={'Empresa removida com sucesso!'}
            />
          </div>
        )}
      </div>
      <DashboardGrid companyId={companyId} />
    </div>
  );
};
