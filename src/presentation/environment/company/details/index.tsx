import {
  Assignment,
  BarChart,
  BusinessCenter,
  Error,
  Group,
  Inventory,
  LocalActivity,
  Recycling,
  Schedule
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useModal } from 'data/hooks/use-modal';
import { Status, statusTranslate } from 'domain/enums';
import { useFindOneCompanyQuery } from 'infra/cache';
import { apiPaths, paths } from 'main/config/paths';
import { formatCNPJ, setFilter } from 'main/utils';
import { MenuCard } from 'presentation/atomic-component/atom/card';
import { Breadcrumbs } from 'presentation/atomic-component/molecule';
import { RegisterCompanyModal } from 'presentation/atomic-component/molecule/modal';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { colors } from 'presentation/style';
import { useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// type TabType =
//   | 'DASHBOARD'
//   | 'COLLABORATOR'
//   | 'WORKSTATION'
//   | 'PRODUCT'
//   | 'WASTE_TYPE'
//   | 'STOP_REASON'
//   | 'RESPONSIBLE_AREA'
//   | 'PRODUCTION_REPORT'
//   | 'SHIFT';

// const TAB_OPTIONS: { title: string; value: TabType }[] = [
//   { title: 'Dashboard', value: 'DASHBOARD' },
//   { title: 'Colaboradores', value: 'COLLABORATOR' },
//   { title: 'Postos de trabalho', value: 'WORKSTATION' },
//   { title: 'Produtos', value: 'PRODUCT' },
//   { title: 'Tipos de refugo', value: 'WASTE_TYPE' },
//   { title: 'Motivos de parada', value: 'STOP_REASON' },
//   { title: 'Área responsável', value: 'RESPONSIBLE_AREA' },
//   { title: 'Apontamento', value: 'PRODUCTION_REPORT' },
//   { title: 'Turno', value: 'SHIFT' }
// ];

export const CompanyDetails: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const companyQuery = useFindOneCompanyQuery({ id }).data;
  const modal = useModal();
  // const [tabSelected, setTabSelected] = useState<TabType>('DASHBOARD');

  useEffect(() => {
    setFilter('company', {
      userId: companyQuery?.id ? companyQuery.id : undefined
    });
  }, [companyQuery?.id]);

  // const renderTabContent = () => {
  //   switch (tabSelected) {
  //     case 'DASHBOARD':
  //       return <div></div>;
  //     case 'COLLABORATOR':
  //       return <CollaboratorContent />;
  //     case 'WORKSTATION':
  //       return <WorkstationContent />;
  //     case 'PRODUCT':
  //       return <ProductContent />;
  //     case 'WASTE_TYPE':
  //       return <WasteTypeContent />;
  //     case 'STOP_REASON':
  //       return <StoppingReasonContent />;
  //     case 'RESPONSIBLE_AREA':
  //       return <ResponsibleAreaContent />;
  //     case 'SHIFT':
  //       return <ShiftContent />;
  //     case 'PRODUCTION_REPORT':
  //       return <ShiftContent />;
  //     default:
  //       return <div>Em breve...</div>;
  //   }
  // };
  const navigate = useNavigate();

  const menuCards = [
    {
      title: 'Postos de trabalho',
      description: 'Gerencie os postos de trabalho desta empresa.',
      icon: <BusinessCenter sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.workstation(id))
    },
    {
      title: 'Colaboradores',
      description: 'Gerencie a lista de colaboradores e operadores.',
      icon: <Group sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.collaborator(id))
    },
    {
      title: 'Produtos',
      description: 'Cadastre e gerencie o catálogo de produtos.',
      icon: <Inventory sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.product(id))
    },
    {
      title: 'Tipos de refugo',
      description: 'Configure os tipos de refugo para os apontamentos.',
      icon: <Recycling sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.wasteType(id))
    },
    {
      title: 'Motivos de parada',
      description: 'Gerencie os motivos de paradas de máquina.',
      icon: <Error sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.stoppingReason(id))
    },
    {
      title: 'Apontamentos',
      description: 'Gerencie os apontamentos de produção.',
      icon: <Assignment sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.productionReport(id))
    },
    {
      title: 'Área responsável',
      description: 'Configure as áreas responsáveis por setores ou máquinas.',
      icon: <LocalActivity sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.responsibleArea(id))
    },
    {
      title: 'Turnos',
      description: 'Configure os turnos de trabalho da empresa.',
      icon: <Schedule sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.shift(id))
    },
    {
      title: 'Dashboard',
      description: 'Acesse o dashboard da empresa.',
      icon: <BarChart sx={{ fontSize: '32px', color: colors.primary }} />,
      onClick: () => navigate(paths.dashboard(id))
    }
  ];

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
      {/* <div>
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
      </div> */}
      <div
        className={
          'grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-5 gap-5 w-full'
        }
      >
        {menuCards.map((card) => (
          <MenuCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={card.onClick}
          />
        ))}
      </div>
    </div>
  );
};
