import { TabPanel } from '@mui/lab';
import { Button } from '@mui/material';
import { useModal } from 'data/hooks/use-modal';
import { Status, statusTranslate } from 'domain/enums';
import { useFindOneCompanyQuery } from 'infra/cache';
import { apiPaths } from 'main/config/paths';
import { formatCNPJ, setFilter } from 'main/utils';
import { Tabs } from 'presentation/atomic-component/atom';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { RegisterCompanyModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import {
  ProductList,
  ResponsibleAreaList,
  ShiftList,
  StopReasonList,
  WorkstationList
} from 'presentation/atomic-component/organism';
import { CollaboratorContent } from 'presentation/atomic-component/organism/content/collaborator';
import { WasteTypeContent } from 'presentation/atomic-component/organism/content/waste-type';
import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

type TabType =
  | 'DASHBOARD'
  | 'COLLABORATOR'
  | 'WORKSTATION'
  | 'PRODUCT'
  | 'WASTE_TYPE'
  | 'STOP_REASON'
  | 'RESPONSIBLE_AREA'
  | 'SHIFT';

const TAB_OPTIONS: { title: string; value: TabType }[] = [
  { title: 'Dashboard', value: 'DASHBOARD' },
  { title: 'Colaboradores', value: 'COLLABORATOR' },
  { title: 'Postos de trabalho', value: 'WORKSTATION' },
  { title: 'Produtos', value: 'PRODUCT' },
  { title: 'Tipos de refugo', value: 'WASTE_TYPE' },
  { title: 'Motivos de parada', value: 'STOP_REASON' },
  { title: 'Área responsável', value: 'RESPONSIBLE_AREA' },
  { title: 'Apontamentos', value: 'SHIFT' }
];

export const CompanyContentDetails: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const companyQuery = useFindOneCompanyQuery({ id }).data;
  const modal = useModal();
  const [tabSelected, setTabSelected] = useState<TabType>('DASHBOARD');

  useEffect(() => {
    setFilter('company', {
      userId: companyQuery?.id ? companyQuery.id : undefined
    });
  }, [companyQuery?.id]);

  const renderTabContent = () => {
    const noop = () => {};
    switch (tabSelected) {
      case 'DASHBOARD':
        return <div></div>;
      case 'COLLABORATOR':
        return <CollaboratorContent />;
      case 'WORKSTATION':
        return <WorkstationList setTotalElements={noop} />;
      case 'PRODUCT':
        return <ProductList setTotalElements={noop} />;
      case 'WASTE_TYPE':
        return <WasteTypeContent />;
      case 'STOP_REASON':
        return <StopReasonList setTotalElements={noop} />;
      case 'RESPONSIBLE_AREA':
        return <ResponsibleAreaList setTotalElements={noop} />;
      case 'SHIFT':
        return <ShiftList setTotalElements={noop} />;
      default:
        return <div>Em breve...</div>;
    }
  };

  return (
    <div className={'flex w-full flex-col  gap-5 '}>
      <Breadcrumbs replaceItems={{ [id]: 'Detalhes de Empresa' }} />

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
            <RegisterCompanyModal
              company={companyQuery}
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
              {formatCNPJ(companyQuery?.cnpj)}
            </p>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <p
              className={`${companyQuery?.status === Status.ENABLED ? 'text-dark-green' : 'text-gray-400'} text-base font-medium`}
            >
              {statusTranslate[companyQuery?.status ?? Status.DISABLED]}
            </p>
          </div>
        </div>
        <div className={'flex w-full tablet:w-auto tablet:min-w-max'}>
          <DeleteConfirmationModal
            id={id}
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
