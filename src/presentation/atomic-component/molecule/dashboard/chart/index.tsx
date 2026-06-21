import type { DashboardContentMap, FindDashboardQuery } from 'domain/models';
import {
  ParetoStoppingsByReasonChart,
  StoppedVsProductiveChart,
  StoppingsByNatureChart,
  StoppingsByResponsibleAreaChart,
  TopStoppingProductsChart,
  TopWasteProductsChart,
  WasteByTypeChart,
  WasteEvolutionMonthlyChart,
  WasteEvolutionWeeklyChart,
  WasteRateByProductChart,
  WasteRateChart
} from 'presentation/atomic-component/atom/chart';
import { WasteEvolutionDailyChart } from 'presentation/atomic-component/atom/chart/waste-evolution-daily';
import type { FC } from 'react';

type AnyDashboardQuery = FindDashboardQuery<keyof DashboardContentMap>;

interface DashboardChartProps {
  data: AnyDashboardQuery;
}

export const DashboardChart: FC<DashboardChartProps> = ({ data }) => {
  switch (data.type) {
    case 'pareto-stoppings-by-reason':
      return (
        <ParetoStoppingsByReasonChart
          data={data as FindDashboardQuery<'pareto-stoppings-by-reason'>}
        />
      );
    case 'top-waste-products':
      return <TopWasteProductsChart data={data as FindDashboardQuery<'top-waste-products'>} />;
    case 'stoppings-by-nature':
      return <StoppingsByNatureChart data={data as FindDashboardQuery<'stoppings-by-nature'>} />;
    case 'waste-rate':
      return <WasteRateChart data={data as FindDashboardQuery<'waste-rate'>} />;
    case 'top-stopping-products':
      return (
        <TopStoppingProductsChart data={data as FindDashboardQuery<'top-stopping-products'>} />
      );
    case 'waste-by-type':
      return <WasteByTypeChart data={data as FindDashboardQuery<'waste-by-type'>} />;

    case 'waste-rate-by-product':
      return <WasteRateByProductChart data={data as FindDashboardQuery<'waste-rate-by-product'>} />;
    case 'waste-evolution-daily':
      return (
        <WasteEvolutionDailyChart data={data as FindDashboardQuery<'waste-evolution-daily'>} />
      );
    case 'waste-evolution-weekly':
      return (
        <WasteEvolutionWeeklyChart data={data as FindDashboardQuery<'waste-evolution-weekly'>} />
      );
    case 'waste-evolution-monthly':
      return (
        <WasteEvolutionMonthlyChart data={data as FindDashboardQuery<'waste-evolution-monthly'>} />
      );
    case 'stopped-vs-productive':
      return (
        <StoppedVsProductiveChart data={data as FindDashboardQuery<'stopped-vs-productive'>} />
      );

    case 'stoppings-by-responsible-area':
      return (
        <StoppingsByResponsibleAreaChart
          data={data as FindDashboardQuery<'stoppings-by-responsible-area'>}
        />
      );
    default:
      return null;
  }
};
