import { TabPanel } from '@mui/lab';
import { Button } from '@mui/material';
import { useFindOneProductionReportQuery } from 'infra/cache';
import { apiPaths } from 'main/config/paths';
import { formatCompactNumber } from 'main/utils';
import { Tabs } from 'presentation/atomic-component/atom';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import {
  CollaboratorContent,
  WorkstationContent
} from 'presentation/atomic-component/organism/content';
import { useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

export const ProductionReportDetails: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const productionReportQuery = useFindOneProductionReportQuery({ id }).data;
  // const modal = useModal();

  // useEffect(() => {
  //   setFilter('productionReport', {
  //     productionReportId: productionReportQuery?.id ? productionReportQuery.id : undefined
  //   });
  // }, [productionReportQuery?.id]);
  type TabType = 'WASTE' | 'STOPPING';

  const TAB_OPTIONS: { title: string; value: TabType }[] = [
    { title: 'Refugos', value: 'WASTE' },
    { title: 'paradas', value: 'STOPPING' }
  ];
  const [tabSelected, setTabSelected] = useState<TabType>('WASTE');
  const renderTabContent = () => {
    switch (tabSelected) {
      case 'WASTE':
        return <CollaboratorContent />;
      case 'STOPPING':
        return <WorkstationContent />;
      default:
        return <div>Em breve...</div>;
    }
  };

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
            {/* <RegisterProductionReportModal
              productionReport={productionReportQuery}
              modal={{
                ...modal,
                closeModal() {
                  modal.closeModal();
                }
              }}
            /> */}
          </div>
          <div className={'flex flex-wrap items-center gap-x-3 gap-y-1'}>
            <p className={'text-gray-400 text-base font-medium'}>
              {productionReportQuery?.workstation?.name}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {formatCompactNumber(productionReportQuery?.production)}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {productionReportQuery?.shift?.name}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p className={'text-gray-400 text-base font-medium'}>
              {productionReportQuery?.product?.name}
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
      <div>
        <Tabs
          onChange={(newValue): void => {
            setTabSelected(newValue as TabType);
          }}
          tabValue={tabSelected}
          tabs={TAB_OPTIONS}
        >
          <TabPanel
            value={tabSelected}
            style={{ paddingTop: '32px', paddingLeft: 0, paddingRight: 0 }}
          >
            {renderTabContent()}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
