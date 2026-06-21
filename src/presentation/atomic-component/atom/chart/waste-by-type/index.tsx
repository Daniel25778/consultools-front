import { BarChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';

export const WasteByTypeChart: FC<ChartProps<'waste-by-type'>> = ({ data }) => (
  <BarChart
    layout={'horizontal'}
    height={Math.max(200, data.content.length * 48)}
    series={[
      {
        data: data.content.map((item) => Math.round(Number(item.quantity))),
        label: 'Quantidade',
        color: colors.primary
      }
    ]}
    xAxis={[{ valueFormatter: (value: number) => String(Math.round(value)), tickMinStep: 1 }]}
    yAxis={[
      {
        width: 100,
        scaleType: 'band',
        data: data.content.map((item) => item.name)
      }
    ]}
  />
);
