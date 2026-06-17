import { Button } from '@mui/material';
import { useModal, useRemoveItems } from 'data/hooks';
import { Role } from 'domain/enums';
import { useFindOneProductionReportQuery } from 'infra/cache';
import { apiPaths } from 'main/config/paths';
import { formatCompactNumber, formatHour } from 'main/utils';
import { getProductionReportMenuCards } from 'presentation/atomic-component/atom/card';
import { MenuCard } from 'presentation/atomic-component/atom/card/menu';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { RegisterProductionReportModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const ProductionReportDetails: FC = () => {
  const { id = '', companyId } = useParams<{ id: string; companyId?: string }>();
  const productionReportQuery = useFindOneProductionReportQuery({ id }).data;
  const { removeItems } = useRemoveItems();
  const { user } = useAppSelector((state) => state.persist);

  const modal = useModal();
  const menuCards = getProductionReportMenuCards(id, companyId);
  return (
    <div className={'flex w-full flex-col  gap-5 '}>
      <Breadcrumbs
        replaceItems={{
          ...(companyId && { [companyId]: 'Detalhes de Empresa' }),
          [id]: 'Detalhes de Apontamento'
        }}
        removeItems={removeItems}
      />
      <div
        className={
          'flex flex-col tablet:flex-row w-full bg-white min-h-[132px] rounded p-6 tablet:p-8 items-start tablet:items-center justify-between gap-6'
        }
      >
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-center gap-2'}>
            <h1 className={'text-primary text-xl tablet:text-2xl font-semibold break-words'}>
              {productionReportQuery?.code}
            </h1>
            {productionReportQuery && (
              <RegisterProductionReportModal
                companyId={companyId}
                productionReport={productionReportQuery}
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
            {user.role !== Role.COLLABORATOR && (
              <>
                <p className={'text-gray-400 text-base font-medium'}>
                  {productionReportQuery?.collaborator?.name}
                </p>
                <p className={'text-gray-400 text-base font-medium'}>•</p>
              </>
            )}
            <p className={'text-gray-400 text-base font-medium'}>
              {productionReportQuery?.workstation?.name}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {formatCompactNumber(productionReportQuery?.production)}{' '}
              {productionReportQuery?.production && productionReportQuery.production > 1
                ? 'produzidos'
                : 'produzido'}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {productionReportQuery?.shift?.name}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {productionReportQuery?.product?.name}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {formatHour(productionReportQuery?.startTime)} -{' '}
              {formatHour(productionReportQuery?.endTime)}
            </p>
          </div>
        </div>
        <div className={'flex w-full tablet:w-auto tablet:min-w-max'}>
          <DeleteConfirmationModal
            id={id}
            openElement={
              <Button variant={'contained'} color={'error'} className={'w-full tablet:w-auto'}>
                Remover apontamento
              </Button>
            }
            title={'Remover apontamento'}
            text={'Deseja realmente remover o apontamento? Todos os dados serão perdidos.'}
            route={apiPaths.productionReport}
            queryName={'productionReport'}
            color={'error'}
            successMessage={'Apontamento removido com sucesso!'}
          />
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-5'}>
        {menuCards.map((card) => (
          <MenuCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            path={card.path}
          />
        ))}
      </div>
    </div>
  );
};
