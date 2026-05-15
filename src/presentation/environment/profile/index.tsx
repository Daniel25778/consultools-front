import { Title } from 'presentation/atomic-component/atom';
import type { FC } from 'react';

export const ProfileContent: FC = () => {
  return (
    <div className={'flex flex-col gap-6'}>
      <Title label={'ProfileContent'} />
    </div>
  );
};
