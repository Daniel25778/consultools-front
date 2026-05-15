import {
  AutoAwesomeMosaicOutlined,
  AutoAwesomeMotionOutlined,
  CalendarMonthOutlined,
  DataSaverOffOutlined,
  East,
  HeadsetOutlined,
  ImageOutlined,
  SettingsOutlined
} from '@mui/icons-material';
import { Switch } from '@mui/material';
import { formatDate } from 'main/utils';
import { type FC, type ReactNode } from 'react';

interface HomeDetectionImagePreviewProps {
  collapse: boolean;
}

export const HomeDetectionImagePreview: FC<HomeDetectionImagePreviewProps> = ({ collapse }) => {
  const earmuffCount = 1;
  const headsetCount = 2;

  const speedItem = (name: string, time: number, icon?: ReactNode): ReactNode => {
    return (
      <div className={'flex flex-col gap-2'}>
        <p className={'flex gap-1 font-semibold text-sm min-w-max'}>
          {icon}
          {name}
        </p>
        <p className={'font-medium text-sm'}>{time?.toFixed(3)} ms</p>
      </div>
    );
  };

  const detectionItem = (name: string, quantity: number | string, icon?: ReactNode): ReactNode => {
    return (
      <div className={'flex flex-col gap-1'}>
        <p className={'flex gap-1 font-semibold text-sm'}>
          {icon}
          {name}
        </p>
        <p className={'font-medium text-sm'}>
          {typeof quantity === 'number'
            ? `${quantity} ${quantity === 1 ? ' item encontrado' : ' itens encontrados'}`
            : quantity}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col gap-4 p-6 rounded dark:border-0 dark:border-gray-500 border-gray-250 dark:bg-gray-800 ${collapse && 'border'}`}
    >
      <div className={'flex justify-between items-center gap-6'}>
        <span className={'flex gap-2'}>
          <ImageOutlined />
          <h2 className={'font-semibold'}>Imagem de Exemplo</h2>
        </span>
      </div>

      <div className={'flex items-center gap-6'}>
        <div
          className={
            'flex items-center justify-center border rounded dark:border-gray-500 border-gray-250 w-full'
          }
        >
          <div className={'flex flex-col justify-center h-[140px] laptop:h-[260px]'}>
            Imagem enviada
          </div>
        </div>
        <div className={'min-w-max'}>
          <East sx={{ fontSize: '30px' }} color={'inherit'} />
        </div>
        <div
          className={
            'flex items-center justify-center border rounded dark:border-gray-500 border-gray-250 w-full'
          }
        >
          <div className={'flex flex-col justify-center h-[140px] laptop:h-[260px]'}>
            Imagem processada
          </div>
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6 laptop:gap-10'}>
        <div className={'flex flex-col gap-4'}>
          <h2 className={'text-xl font-semibold text-primary'}>Tempos</h2>

          <div className={'grid grid-cols-2 gap-6 laptop:gap-x-10'}>
            {speedItem('Total', 0, <DataSaverOffOutlined fontSize={'small'} />)}
            {speedItem('Inferência', 0, <SettingsOutlined fontSize={'small'} />)}
            {speedItem('Pré processo', 0, <AutoAwesomeMotionOutlined fontSize={'small'} />)}
            {speedItem('Pós processo', 0, <AutoAwesomeMosaicOutlined fontSize={'small'} />)}
          </div>
        </div>
        <div className={'flex flex-col gap-4 min-w-max'}>
          <h2 className={'hidden tablet:flex text-xl font-semibold text-primary'}>ㅤ</h2>
          {detectionItem(
            'Data de criação',
            formatDate('2026-01-01:00:00.000000', 'dd/MM/yyyy - HH:mm', false),
            <CalendarMonthOutlined fontSize={'small'} />
          )}
        </div>
        <div className={'flex flex-col gap-4'}>
          <h2 className={'text-xl font-semibold text-primary'}>Detecções</h2>
          <div className={'flex flex-col gap-2'}>
            {earmuffCount > 0 &&
              detectionItem(
                'Protetor de ouvido',
                earmuffCount,
                <HeadsetOutlined fontSize={'small'} />
              )}
            {headsetCount > 0 &&
              detectionItem('Fone de ouvido', headsetCount, <HeadsetOutlined fontSize={'small'} />)}
          </div>
          <div className={'flex gap-1 items-center min-w-max'}>
            <h2 className={'font-semibold'}>Sucesso na detecção</h2>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};
