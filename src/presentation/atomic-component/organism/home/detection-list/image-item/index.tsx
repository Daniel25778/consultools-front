import {
  AutoAwesomeMosaicOutlined,
  AutoAwesomeMotionOutlined,
  CalendarMonthOutlined,
  DataSaverOffOutlined,
  East,
  Fullscreen,
  HeadsetOutlined,
  ImageOutlined,
  SettingsOutlined
} from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import { useModal } from 'data/hooks';
import type { Detection } from 'domain/models';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, formatDate, resolverError } from 'main/utils';
import { Modal } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style';
import { type FC, type ReactNode } from 'react';

interface HomeDetectionImageProps {
  item: Detection;
  index: number;
  collapse: boolean;
}

export const HomeDetectionImage: FC<HomeDetectionImageProps> = ({ item, index, collapse }) => {
  const modal = useModal();
  const earmuffCount = item?.result?.detected_objects?.filter(
    (obj) => obj.class_name === 'earmuff'
  ).length;

  const headsetCount = item?.result?.detected_objects?.filter(
    (obj) => obj.class_name === 'headset'
  ).length;

  const updateSuccess = async (success: boolean) => {
    try {
      await api.put({ route: apiPaths.detection, body: { success }, id: item.id });

      callToast.success('Atualizado com sucesso');
    } catch (error) {
      resolverError(error);
    }
  };

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
      <Modal
        hideBackground
        closeModal={modal.closeModal}
        isOpen={modal.isOpen}
        openModal={modal.openModal}
      >
        <div className={'flex flex-col tablet:flex-row items-center p-2 gap-6 bg-white'}>
          <div className={'border rounded-md'}>
            <img src={item.image_path} />
          </div>
          <East
            className={'rotate-90 tablet:rotate-0'}
            sx={{ color: colors.gray[500], fontSize: '30px' }}
          />
          <div className={'border rounded-md'}>
            <img src={item.image_result_path} />
          </div>
        </div>
      </Modal>

      <div className={'flex justify-between items-center gap-6'}>
        <span className={'flex gap-2'}>
          <ImageOutlined />
          <h2 className={'font-semibold'}>Imagem {index < 10 ? `0${index}` : index}</h2>
        </span>
        <IconButton color={'inherit'} onClick={modal.openModal}>
          <Fullscreen color={'inherit'} />
        </IconButton>
      </div>

      <div className={'flex items-center gap-6'}>
        <div
          className={
            'flex cursor-pointer items-center justify-center border rounded dark:border-gray-500 border-gray-200 bg-white w-full'
          }
          onClick={modal.openModal}
        >
          <img src={item.image_path} className={'h-[140px] laptop:h-[240px]'} />
        </div>
        <div className={'min-w-max'}>
          <East sx={{ fontSize: '30px' }} color={'inherit'} />
        </div>
        <div
          className={
            'flex cursor-pointer items-center justify-center border rounded dark:border-gray-500 border-gray-200 bg-white w-full'
          }
          onClick={modal.openModal}
        >
          <img src={item.image_result_path} className={'h-[140px] laptop:h-[240px]'} />
        </div>
      </div>

      <div className={'flex flex-col tablet:flex-row gap-6 laptop:gap-10'}>
        <div className={'flex flex-col gap-4'}>
          <h2 className={'text-xl font-semibold text-primary'}>Tempos</h2>

          <div className={'grid grid-cols-2 gap-6 laptop:gap-x-10'}>
            {speedItem(
              'Total',
              item?.result?.speed?.total_ms,
              <DataSaverOffOutlined fontSize={'small'} />
            )}
            {speedItem(
              'Inferência',
              item?.result?.speed?.inference_ms,
              <SettingsOutlined fontSize={'small'} />
            )}
            {speedItem(
              'Pré processo',
              item?.result?.speed?.preprocess_ms,
              <AutoAwesomeMotionOutlined fontSize={'small'} />
            )}
            {speedItem(
              'Pós processo',
              item?.result?.speed?.postprocess_ms,
              <AutoAwesomeMosaicOutlined fontSize={'small'} />
            )}
          </div>
        </div>
        <div className={'flex flex-col gap-4 min-w-max'}>
          <h2 className={'hidden tablet:flex text-xl font-semibold text-primary'}>ㅤ</h2>
          {detectionItem(
            'Data de criação',
            formatDate(item.created_at, 'dd/MM/yyyy - HH:mm', false),
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
            {headsetCount === 0 && earmuffCount === 0 ? (
              <p className={'font-medium text-sm'}>Nenhum Fone/Protetor de ouvido foi econtrado</p>
            ) : null}
          </div>
          <div className={'flex gap-1 items-center min-w-max'}>
            <h2 className={'font-semibold'}>Sucesso na detecção</h2>
            <Switch
              defaultChecked
              onChange={(event) => {
                updateSuccess(event.target.checked);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
