import { Title } from 'presentation/atomic-component/atom';
import type { FC } from 'react';

export const YoloDetailContent: FC = () => {
  return (
    <div className={'flex flex-col gap-6'}>
      <Title label={'YoloDetailContent'} />
    </div>
  );
};
