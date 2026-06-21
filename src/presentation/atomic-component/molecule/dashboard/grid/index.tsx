import type { DashboardContentMap } from 'domain/models';
import { useFindDashboardTypesQuery } from 'infra/cache';
import type { FC } from 'react';
import { DashboardItem } from '../item';

interface DashboardGridProps {
  companyId: string;
}

const ORDER: (keyof DashboardContentMap)[] = [
  'stoppings-by-nature',
  'waste-evolution-daily',
  'top-stopping-products',
  'waste-rate',
  'stopped-vs-productive',
  'waste-by-type',
  'pareto-stoppings-by-reason',
  'stoppings-by-responsible-area',
  'waste-rate-by-product',
  'waste-evolution-weekly',
  'waste-evolution-monthly',
  'top-waste-products'
];

export const DashboardGrid: FC<DashboardGridProps> = ({ companyId }) => {
  const typesQuery = useFindDashboardTypesQuery({});

  const types = (typesQuery.data?.content ?? [])
    .slice()
    .sort((a, b) => ORDER.indexOf(a.value) - ORDER.indexOf(b.value));

  return (
    <div className={'grid grid-cols-1 laptop:grid-cols-4  gap-5 w-full'}>
      {types.map((type) => (
        <DashboardItem
          key={type.value}
          companyId={companyId}
          type={type.value}
          label={type.label}
        />
      ))}
    </div>
  );
};
