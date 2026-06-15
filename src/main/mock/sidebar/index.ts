import type * as MaterialIcons from '@mui/icons-material';
import { Role } from 'domain/enums';
import { queryClient } from 'infra/lib';
import { paths, QueryName } from 'main/config';
import { resetFilter } from 'store/filters/slice';
import { store } from 'store/index';

interface item {
  icon: keyof typeof MaterialIcons;
  link: string;
  name: string;
  onClick?: () => void;
}

export const companiesSidebarItem: item = {
  icon: 'ApartmentOutlined',
  link: paths.company,
  name: 'Empresas'
};

const productionReportCollaborator: item = {
  icon: 'AssessmentOutlined',
  link: paths.productionReport,
  name: 'Apontamentos',
  onClick: () => {
    queryClient.resetQueries({ queryKey: [QueryName.collaborator] });
    store.dispatch(resetFilter('collaborator'));
  }
};

const consultantsAdmin: item = {
  icon: 'PeopleOutline',
  link: paths.consultant,
  name: 'Consultores',
  onClick: () => {
    queryClient.resetQueries({ queryKey: [QueryName.user] });
    store.dispatch(resetFilter('user'));
  }
};

export const getCompanyMenuCards = (id: string): item[] => [
  {
    name: 'Dashboard',
    icon: 'BarChart',
    link: paths.companyDetails(id)
  },
  {
    name: 'Colaboradores',
    icon: 'Group',
    link: paths.collaborator(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.collaborator] });
      store.dispatch(resetFilter('collaborator'));
    }
  },
  {
    name: 'Postos de trabalho',
    icon: 'BusinessCenter',
    link: paths.workstation(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.workstation] });
      store.dispatch(resetFilter('workstation'));
    }
  },
  {
    name: 'Área responsável',
    icon: 'LocalActivity',
    link: paths.responsibleArea(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.responsibleArea] });
      store.dispatch(resetFilter('responsibleArea'));
    }
  },
  {
    name: 'Turnos',
    icon: 'Schedule',
    link: paths.shift(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.shift] });
      store.dispatch(resetFilter('shift'));
    }
  },
  {
    name: 'Produtos',
    icon: 'Inventory',
    link: paths.product(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.product] });
      store.dispatch(resetFilter('product'));
    }
  },
  {
    name: 'Tipos de refugo',
    icon: 'Recycling',
    link: paths.wasteType(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.wasteType] });
      store.dispatch(resetFilter('wasteType'));
    }
  },
  {
    name: 'Motivos de parada',
    icon: 'Error',
    link: paths.stoppingReason(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.stoppingReason] });
      store.dispatch(resetFilter('stoppingReason'));
    }
  },
  {
    name: 'Apontamentos',
    icon: 'Assignment',
    link: paths.productionReportCompany(id),
    onClick: () => {
      queryClient.resetQueries({ queryKey: [QueryName.productionReport] });
      store.dispatch(resetFilter('productionReport'));
    }
  }
];

export const sidebarItems = ({ companyId, role }: { companyId?: string; role: Role }) => {
  if (role === Role.COLLABORATOR) return [productionReportCollaborator];

  if (role === Role.ADMIN) return [consultantsAdmin];

  if (!companyId) return [companiesSidebarItem];

  return getCompanyMenuCards(companyId);
};
