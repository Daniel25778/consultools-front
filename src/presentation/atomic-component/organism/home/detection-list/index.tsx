import { Button } from '@mui/material';
import type { DetectionCreation } from 'domain/models';
import { Title } from 'presentation/atomic-component/atom';
import { type Dispatch, type FC, type SetStateAction } from 'react';
import { HomeDetectionYoloItem } from './yolo-item';
import { HomeDetectionYoloItemPreview } from './yolo-item/preview';

interface HomeDetectionListProps {
  detectionsCreation: DetectionCreation[];
  setDetectionsCreation: Dispatch<SetStateAction<DetectionCreation[]>>;
}

export const HomeDetectionList: FC<HomeDetectionListProps> = ({
  detectionsCreation,
  setDetectionsCreation
}) => {
  return (
    <div className={'flex flex-col gap-4 laptop:w-[62%] laptop:order-1 laptop:px-6'}>
      <div
        className={
          'flex flex-col items-end laptop:flex-row laptop:items-start justify-between gap-4'
        }
      >
        <div className={'flex flex-col'}>
          <Title label={'Detecções geradas'} />
          <p className={'text-[15px]'}>
            Selecione os modelos de Yolo e envie as imagens para a detecção de objetos
          </p>
        </div>
        {detectionsCreation?.length > 0 ? (
          <Button onClick={() => setDetectionsCreation([])}>Limpar lista</Button>
        ) : null}
      </div>
      <div className={'flex flex-col gap-2'}>
        {detectionsCreation?.length > 0 ? (
          detectionsCreation?.map((item, index) => (
            <HomeDetectionYoloItem item={item} key={`${item.yolo_id}-${index}`} />
          ))
        ) : (
          <HomeDetectionYoloItemPreview />
        )}
      </div>
    </div>
  );
};
