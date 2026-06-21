import { LineChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models/chart-props';
import { formatDate } from 'main/utils';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const WasteEvolutionWeeklyChart: FC<ChartProps<'waste-evolution-weekly'>> = ({ data }) => (
  <LineChart
    height={260}
    yAxis={[
      {
        width: 100
      }
    ]}
    xAxis={[{ scaleType: 'band', data: data.content.map((item) => formatDate(item.week, 'eee')) }]}
    series={[
      {
        data: data.content.map((item) => +item.waste),
        label: 'Refugo semanal',
        color: colors.primary
      }
    ]}
  />
);
