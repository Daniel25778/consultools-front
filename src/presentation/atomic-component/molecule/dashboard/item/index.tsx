import type { DashboardContentMap } from 'domain/models';
import { useFindDashboardQuery } from 'infra/cache';
import type { FC } from 'react';
import { DashboardCard } from '../card';

interface DashboardItemProps {
  companyId: string;
  type: keyof DashboardContentMap;
  label: string;
}

export const DashboardItem: FC<DashboardItemProps> = ({ companyId, type, label }) => {
  const { data, isLoading } = useFindDashboardQuery({ type, companyId });

  if (!data) return null;

  return <DashboardCard label={label} data={data} isLoading={isLoading} />;
};
