import { BarChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models/chart-props';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const TopWasteProductsChart: FC<ChartProps<'top-waste-products'>> = ({ data }) => (
  <BarChart
    layout={'horizontal'}
    height={Math.max(200, data.content.length * 48)}
    yAxis={[{ scaleType: 'band', data: data.content.map((item) => item.name), width: 100 }]}
    series={[
      {
        data: data.content.map((item) => +item.waste),
        label: 'Quantidade de refugo',
        color: colors.primary
      }
    ]}
  />
);
