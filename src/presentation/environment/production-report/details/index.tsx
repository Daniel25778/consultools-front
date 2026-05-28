import { Error, Recycling } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useModal } from 'data/hooks';
import { useFindOneProductionReportQuery } from 'infra/cache';
import { apiPaths, paths } from 'main/config/paths';
import { formatCompactNumber, formatHour } from 'main/utils';
import { MenuCard } from 'presentation/atomic-component/atom/card';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { RegisterProductionReportModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { colors } from 'presentation/style';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductionReportDetails: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productionReportQuery = useFindOneProductionReportQuery({ id }).data;
  const modal = useModal();
  return (
    <div className={'flex w-full flex-col  gap-5 '}>
      <Breadcrumbs replaceItems={{ [id]: 'Detalhes de apontamento' }} />
      <div
        className={
          'flex flex-col tablet:flex-row w-full bg-white rounded p-6 tablet:p-8 items-start tablet:items-center justify-between gap-6'
        }
      >
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-center gap-2'}>
            <h1 className={'text-primary text-xl tablet:text-2xl font-semibold break-words'}>
              {productionReportQuery?.code}
            </h1>
            <RegisterProductionReportModal
              productionReport={productionReportQuery}
              modal={{
                ...modal,
                closeModal() {
                  modal.closeModal();
                }
              }}
            />
          </div>
          <div className={'flex flex-wrap items-center gap-x-3 gap-y-1'}>
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
        <MenuCard
          title={'Cadastro de Refugos'}
          description={'Cadastre os refugos relacionados a este apontamento de produção.'}
          icon={<Recycling sx={{ fontSize: '32px', color: colors.primary }} />}
          onClick={() => console.log('Navegar para refugos')}
        />
        <MenuCard
          title={'Cadastro de Paradas'}
          description={'Cadastre as paradas relacionadas a este apontamento de produção.'}
          icon={<Error sx={{ fontSize: '32px', color: colors.primary }} />}
          onClick={() => navigate(paths.stopping(id))}
        />
      </div>
    </div>
  );
};
