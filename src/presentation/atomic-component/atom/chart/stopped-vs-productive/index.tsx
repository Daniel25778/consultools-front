import { PieChart } from '@mui/x-charts';
import type { ChartProps } from 'domain/models';
import { formatDuration } from 'main/utils';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const StoppedVsProductiveChart: FC<ChartProps<'stopped-vs-productive'>> = ({ data }) => {
  const item = data.content[0];
  if (!item) return null;
  const chartData = [
    { id: 0, value: Number(item.stopped_hours) / 3600, label: 'Parado' },
    { id: 1, value: Number(item.productive_hours) / 3600, label: 'Produtivo' }
  ].filter((item) => item.value > 0);
  if (!chartData.length)
    return <p className={'text-gray-400 text-sm text-center py-24'}>Sem dados para exibir</p>;
  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: Number(item.stopped_hours) / 3600,
              label: 'Parado',
              color: colors.blue[50]
            },
            {
              id: 1,
              value: Number(item.productive_hours) / 3600,
              label: 'Produtivo',
              color: colors.primary
            }
          ].filter((item) => item.value > 0),
          innerRadius: 60,
          valueFormatter: (item) => formatDuration(item.value * 3600 * 1000)
        }
      ]}
      height={260}
    />
  );
};
