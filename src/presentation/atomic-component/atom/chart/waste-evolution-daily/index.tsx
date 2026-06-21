import { LineChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models/chart-props';
import { formatDate } from 'main/utils';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';

export const WasteEvolutionDailyChart: FC<ChartProps<'waste-evolution-daily'>> = ({ data }) => (
  <LineChart
    height={260}
    yAxis={[
      {
        width: 100
      }
    ]}
    xAxis={[
      { scaleType: 'band', data: data.content.map((item) => formatDate(item.day, 'MMM dd')) }
    ]}
    series={[
      {
        data: data.content.map((item) => +item.waste),
        label: 'Refugo diário',
        color: colors.primary
      }
    ]}
  />
);
