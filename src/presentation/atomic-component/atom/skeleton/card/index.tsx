import type { FC } from 'react';

interface CardSkeletonProps {
  items?: number;
  height?: number;
  vertical?: boolean;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({
  items = 4,
  height = 120,
  vertical,
}) => {
  return (
    <div
      className={`flex flex-col w-full gap-6 ${vertical ? 'flex-col' : 'tablet:flex-row'}`}
    >
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={String(index)}
          className={'w-full bg-gray-200 animate-pulse'}
          style={{ height }}
        />
      ))}
    </div>
  );
};
