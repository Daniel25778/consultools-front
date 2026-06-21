import { LineChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models/chart-props';
import { formatDate } from 'main/utils';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';

export const WasteEvolutionMonthlyChart: FC<ChartProps<'waste-evolution-monthly'>> = ({ data }) => {
  return (
    <LineChart
      height={260}
      xAxis={[
        { scaleType: 'band', data: data.content.map((item) => formatDate(item.month, 'MMMM')) }
      ]}
      yAxis={[{ valueFormatter: (value: number) => String(Math.round(value * 10) / 10) }]}
      series={[
        {
          data: data.content.map((item) => +item.waste),
          label: 'Refugo mensal',
          color: colors.primary
        }
      ]}
    />
  );
};
