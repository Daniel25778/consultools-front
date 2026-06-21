import type { DashboardContentMap, FindDashboardQuery } from 'domain/models';
import type { FC } from 'react';
import { DashboardChart } from '../chart';

interface DashboardCardProps {
  label: string;
  data: FindDashboardQuery<keyof DashboardContentMap>;
  isLoading?: boolean;
}

const WIDE_TYPES: (keyof DashboardContentMap)[] = [
  'waste-evolution-daily',
  'top-stopping-products',
  'waste-by-type'
];

const MEDIUM_TYPES: (keyof DashboardContentMap)[] = [
  'pareto-stoppings-by-reason',
  'stoppings-by-responsible-area',
  'waste-rate-by-product',
  'waste-evolution-weekly',
  'waste-evolution-monthly',
  'top-waste-products'
];
export const DashboardCard: FC<DashboardCardProps> = ({ label, data, isLoading }) => {
  const isWide = WIDE_TYPES.includes(data.type);
  const isMedium = MEDIUM_TYPES.includes(data.type);

  const colSpanClass = isWide
    ? 'col-span-1 laptop:col-span-3 desktop:col-span-3'
    : isMedium
      ? 'col-span-1 laptop:col-span-2 desktop:col-span-2'
      : 'col-span-1';

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm flex flex-col gap-3 ${colSpanClass}`}
    >
      <h3 className={'text-sm font-semibold text-gray-600 dark:text-gray-300'}>{label}</h3>

      {isLoading ? (
        <div className={'flex items-center justify-center h-[200px]'}>
          <span className={'text-gray-400 text-sm animate-pulse'}>Carregando...</span>
        </div>
      ) : data.content.length === 0 ? (
        <div className={'flex items-center justify-center h-[200px]'}>
          <span className={'text-gray-400 text-sm'}>Sem dados para exibir</span>
        </div>
      ) : (
        <div className={'overflow-x-auto w-full'}>
          <div className={'min-w-[500px] tablet:min-w-0'}>
            <DashboardChart data={data} />
          </div>
        </div>
      )}
    </div>
  );
};
