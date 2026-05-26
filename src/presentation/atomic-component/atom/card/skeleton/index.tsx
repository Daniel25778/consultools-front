import { Skeleton } from '@mui/material';
import type { FC } from 'react';

export const CardSkeleton: FC = () => (
  <div
    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
    className={'grid gap-[18px] mt-4'}
  >
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1 w-full'}>
          <Skeleton variant={'text'} width={'60%'} height={28} />
          <Skeleton variant={'text'} width={'40%'} height={20} />
        </div>
        <div className={'flex gap-2'}>
          <Skeleton variant={'circular'} width={32} height={32} />
          <Skeleton variant={'circular'} width={32} height={32} />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <Skeleton variant={'rounded'} width={80} height={24} />
        <Skeleton variant={'text'} width={100} height={24} />
      </div>
    </div>
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1 w-full'}>
          <Skeleton variant={'text'} width={'60%'} height={28} />
          <Skeleton variant={'text'} width={'40%'} height={20} />
        </div>
        <div className={'flex gap-2'}>
          <Skeleton variant={'circular'} width={32} height={32} />
          <Skeleton variant={'circular'} width={32} height={32} />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <Skeleton variant={'rounded'} width={80} height={24} />
        <Skeleton variant={'text'} width={100} height={24} />
      </div>
    </div>
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1 w-full'}>
          <Skeleton variant={'text'} width={'60%'} height={28} />
          <Skeleton variant={'text'} width={'40%'} height={20} />
        </div>
        <div className={'flex gap-2'}>
          <Skeleton variant={'circular'} width={32} height={32} />
          <Skeleton variant={'circular'} width={32} height={32} />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <Skeleton variant={'rounded'} width={80} height={24} />
        <Skeleton variant={'text'} width={100} height={24} />
      </div>
    </div>
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-1 w-full'}>
          <Skeleton variant={'text'} width={'60%'} height={28} />
          <Skeleton variant={'text'} width={'40%'} height={20} />
        </div>
        <div className={'flex gap-2'}>
          <Skeleton variant={'circular'} width={32} height={32} />
          <Skeleton variant={'circular'} width={32} height={32} />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <Skeleton variant={'rounded'} width={80} height={24} />
        <Skeleton variant={'text'} width={100} height={24} />
      </div>
    </div>
  </div>
);
