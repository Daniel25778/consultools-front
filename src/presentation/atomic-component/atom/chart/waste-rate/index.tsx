import type { ChartProps } from 'domain/models';
import type { FC } from 'react';

export const WasteRateChart: FC<ChartProps<'waste-rate'>> = ({ data }) => {
  const item = data.content[0];
  if (!item) return null;
  const rate = +item.wasteRate;

  return (
    <div className={'flex flex-col items-center justify-center gap-3 py-6'}>
      <p className={'text-5xl font-bold text-primary'}>{rate.toFixed(1)}%</p>
      <p className={'text-gray-500 text-sm'}>Taxa de refugo</p>
      <div className={'w-full bg-gray-200 rounded-full h-3 mt-2'}>
        <div
          className={'bg-red h-3 rounded-full transition-all'}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <div className={'flex justify-between w-full text-xs text-gray-400 mt-1'}>
        <span>Refugo: {(+item.waste).toLocaleString('pt-BR')}</span>
        <span>Produção: {(+item.production).toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
};
