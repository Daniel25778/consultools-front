import { BarChart } from '@mui/x-charts';
import { secondsToHours } from 'date-fns';
import type { ChartProps } from 'domain/models/chart-props';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const ParetoStoppingsByReasonChart: FC<ChartProps<'pareto-stoppings-by-reason'>> = ({
  data
}) => (
  <BarChart
    layout={'horizontal'}
    height={Math.max(200, data.content.length * 48)}
    yAxis={[{ scaleType: 'band', data: data.content.map((item) => item.name), width: 100 }]}
    xAxis={[{ valueFormatter: (value: number) => String(Math.round(value)), tickMinStep: 1 }]}
    series={[
      {
        data: data.content.map((item) => secondsToHours(Number(item.stoppedSeconds))),
        label: 'Horas paradas',
        color: colors.primary
      }
    ]}
  />
);
