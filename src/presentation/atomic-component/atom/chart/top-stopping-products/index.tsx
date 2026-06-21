import { BarChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models';
import { formatDuration } from 'main/utils';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const TopStoppingProductsChart: FC<ChartProps<'top-stopping-products'>> = ({ data }) => (
  <BarChart
    layout={'horizontal'}
    height={Math.max(200, data.content.length * 48)}
    yAxis={[{ scaleType: 'band', data: data.content.map((item) => item.name), width: 70 }]}
    xAxis={[{ valueFormatter: (value: number) => String(Math.round(value)), tickMinStep: 1 }]}
    series={[
      {
        data: data.content.map((item) => Number(item.stoppedSeconds) / 3600),
        label: 'Horas paradas',
        color: colors.primary,
        valueFormatter: (value) => formatDuration((value ?? 0) * 3600 * 1000)
      }
    ]}
  />
);
