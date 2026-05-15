import { useFindYoloQuery } from 'infra/cache';
import { Title } from 'presentation/atomic-component/atom';
import type { FC } from 'react';

export const YoloContent: FC = () => {
  const yoloQuery = useFindYoloQuery({});

  return (
    <div className={'flex flex-col gap-6'}>
      <Title label={'Modelos de Yolo'} />

      {yoloQuery.data?.content.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
