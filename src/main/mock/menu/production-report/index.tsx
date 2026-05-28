import { Error, Recycling } from '@mui/icons-material';
import { paths } from 'main/config/paths';
import { colors } from 'presentation/style';
import type { ReactNode } from 'react';

interface MenuCardConfig {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  companyId?: string;
}

export const getProductionReportMenuCards = (id: string, companyId?: string): MenuCardConfig[] => [
  {
    title: 'Refugos',
    description: 'Cadastre os refugos relacionados a este apontamento de produção.',
    icon: <Recycling sx={{ fontSize: '32px', color: colors.primary }} />,
    path: companyId ? paths.wasteCompany(id, companyId) : paths.waste(id)
  },
  {
    title: 'Paradas',
    description: 'Cadastre as paradas relacionadas a este apontamento de produção.',
    icon: <Error sx={{ fontSize: '32px', color: colors.primary }} />,
    path: companyId ? paths.stoppingCompany(id, companyId) : paths.stopping(id)
  }
];
