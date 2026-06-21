import { PieChart } from '@mui/x-charts';
import { secondsToHours } from 'date-fns';
import type { ChartProps } from 'domain/models/chart-props';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';

export const StoppingsByNatureChart: FC<ChartProps<'stoppings-by-nature'>> = ({ data }) => (
  <PieChart
    series={[
      {
        data: data.content.map((item, i) => ({
          id: i,
          value: secondsToHours(Number(item.stoppedSeconds)),
          label: item.nature === 'PLANNED' ? 'Planejada' : 'Não planejada',
          color: item.nature === 'PLANNED' ? colors.blue[50] : colors.primary
        })),
        innerRadius: 60
      }
    ]}
    height={260}
  />
);
