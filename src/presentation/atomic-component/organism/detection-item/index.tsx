import {
  AutoAwesomeMosaicOutlined,
  AutoAwesomeMotionOutlined,
  CalendarMonthOutlined,
  DataSaverOffOutlined,
  East,
  Fullscreen,
  HeadsetOutlined,
  SettingsOutlined
} from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import { useModal } from 'data/hooks';
import type { Detection, Yolo } from 'domain/models';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, QueryName } from 'main/config';
import { callToast, formatDate, resolverError } from 'main/utils';
import { Modal } from 'presentation/atomic-component/atom';
import { YoloModal } from 'presentation/atomic-component/molecule/modal';
import { colors } from 'presentation/style';
import { type FC, type ReactNode } from 'react';

interface DetectionItemProps {
  item: Detection;
  yolo?: Yolo;
}

export const DetectionItem: FC<DetectionItemProps> = ({ item, yolo }) => {
  const modal = useModal();
  const yoloModal = useModal();
  const earmuffCount = item?.result?.detected_objects?.filter(
    (obj) => obj.class_name === 'earmuff'
  ).length;

  const headsetCount = item?.result?.detected_objects?.filter(
    (obj) => obj.class_name === 'headset'
  ).length;

  const updateSuccess = async (success: boolean) => {
    try {
      await api.put({ route: apiPaths.detection, body: { success }, id: item.id });

      queryClient.invalidateQueries({ queryKey: [QueryName.detection] });
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
      className={
        'flex flex-col gap-4 p-6 rounded dark:border-0 dark:border-gray-500 border-gray-250 dark:bg-gray-800 border'
      }
    >
      <Modal
        hideBackground
        closeModal={modal.closeModal}
        isOpen={modal.isOpen}
        openModal={modal.openModal}
      >
        <div
          className={
            'flex flex-col tablet:flex-row items-center p-2 gap-6 bg-white dark:bg-gray-600'
          }
        >
          <div className={'border rounded-md dark:border-gray-800'}>
            <img src={item.image_path} className={'rounded-md'} />
          </div>
          <East
            className={'rotate-90 tablet:rotate-0'}
            sx={{ color: colors.gray[400], fontSize: '30px' }}
          />
          <div className={'border rounded-md dark:border-gray-800'}>
            <img src={item.image_result_path} className={'rounded-md'} />
          </div>
        </div>
      </Modal>

      <div className={'flex justify-between items-center gap-6'}>
        <span className={'flex items-center gap-2'}>
          <h2 className={'font-semibold text-primary text-xl'}>{item?.result?.yolo_name}</h2>
          {yolo && <YoloModal modal={yoloModal} type={'DETECTION'} yolo={yolo} />}
        </span>
        <IconButton color={'inherit'} onClick={modal.openModal}>
          <Fullscreen color={'inherit'} />
        </IconButton>
      </div>

      <div className={'flex items-center gap-6'}>
        <div
          className={
            'flex cursor-pointer items-center justify-center border rounded dark:border-gray-500 border-gray-200 bg-white dark:bg-gray-600 w-full'
          }
          onClick={modal.openModal}
        >
          <img src={item.image_path} className={'h-[140px] laptop:h-[190px]'} />
        </div>
        <div className={'min-w-max'}>
          <East sx={{ fontSize: '30px' }} color={'inherit'} />
        </div>
        <div
          className={
            'flex cursor-pointer items-center justify-center border rounded dark:border-gray-500 border-gray-200 bg-white dark:bg-gray-600 w-full'
          }
          onClick={modal.openModal}
        >
          <img src={item.image_result_path} className={'h-[140px] laptop:h-[190px]'} />
        </div>
      </div>

      <div className={'flex flex-col laptop:flex-row laptop:flex-wrap gap-2'}>
        <div className={'flex flex-col gap-4'}>
          <h2 className={'text-xl font-semibold text-primary'}>Tempos</h2>

          <div className={'grid grid-cols-2 gap-6 laptop:gap-x-2'}>
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
        <div className={'flex flex-col gap-4 desktop:ml-auto'}>
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
              <p className={'font-medium text-sm'}>Nenhum objeto econtrado</p>
            ) : null}
          </div>
          <div className={'flex gap-1 items-center min-w-max'}>
            <h2 className={'font-semibold'}>Sucesso na detecção</h2>
            <Switch
              defaultChecked={item.success}
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
