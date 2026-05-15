import { ArrowDropUp } from '@mui/icons-material';
import type { FC, ReactNode } from 'react';

interface NumberMetricProps {
  number: number;
  type?: 'PERCENTAGE';
}

export const NumberMetric: FC<NumberMetricProps> = ({ number, type = 'PERCENTAGE' }) => {
  const getEndData = (): ReactNode => {
    switch (type) {
      case 'PERCENTAGE':
        return '%';

      default:
        return null;
    }
  };

  return (
    <span
      className={`flex text-sm items-center min-w-max max-w-min px-2 py-1 h-min rounded-full ${number > 0 ? 'bg-green text-success' : 'bg-lightRed text-red'}`}
    >
      <ArrowDropUp className={number < 0 ? 'rotate-180' : ''} fontSize={'small'} />
      {number.toFixed(1)} {getEndData()}
    </span>
  );
};
