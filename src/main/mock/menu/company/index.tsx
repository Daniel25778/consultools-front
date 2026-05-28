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
import { paths } from 'main/config/paths';
import { colors } from 'presentation/style';
import type { ReactNode } from 'react';

interface MenuCardConfig {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
}

export const getCompanyMenuCards = (id: string): MenuCardConfig[] => [
  {
    title: 'Dashboard',
    description: 'Acesse o dashboard da empresa.',
    icon: <BarChart sx={{ fontSize: '32px', color: colors.primary }} />,
    path: ''
  },
  {
    title: 'Colaboradores',
    description: 'Gerencie a lista de colaboradores e operadores.',
    icon: <Group sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.collaborator(id)
  },
  {
    title: 'Postos de trabalho',
    description: 'Gerencie os postos de trabalho desta empresa.',
    icon: <BusinessCenter sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.workstation(id)
  },
  {
    title: 'Área responsável',
    description: 'Configure as áreas responsáveis por setores ou máquinas.',
    icon: <LocalActivity sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.responsibleArea(id)
  },
  {
    title: 'Turnos',
    description: 'Configure os turnos de trabalho da empresa.',
    icon: <Schedule sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.shift(id)
  },
  {
    title: 'Produtos',
    description: 'Cadastre e gerencie o catálogo de produtos.',
    icon: <Inventory sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.product(id)
  },
  {
    title: 'Tipos de refugo',
    description: 'Configure os tipos de refugo para os apontamentos.',
    icon: <Recycling sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.wasteType(id)
  },
  {
    title: 'Motivos de parada',
    description: 'Gerencie os motivos de paradas de máquina.',
    icon: <Error sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.stoppingReason(id)
  },
  {
    title: 'Apontamentos',
    description: 'Gerencie os apontamentos de produção.',
    icon: <Assignment sx={{ fontSize: '32px', color: colors.primary }} />,
    path: paths.productionReportCompany(id)
  }
];
