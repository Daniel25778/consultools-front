import { BarChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models/chart-props';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const WasteRateByProductChart: FC<ChartProps<'waste-rate-by-product'>> = ({ data }) => (
  <BarChart
    layout={'horizontal'}
    height={Math.max(200, data.content.length * 48)}
    yAxis={[{ scaleType: 'band', data: data.content.map((item) => item.name), width: 100 }]}
    series={[
      {
        data: data.content.map((item) => +item.wasteRate),
        label: 'Taxa de refugo (%)',
        color: colors.primary
      }
    ]}
  />
);
