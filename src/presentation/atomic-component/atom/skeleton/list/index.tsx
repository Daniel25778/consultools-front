import { Skeleton, TableCell, TableRow } from '@mui/material';
import type { FC } from 'react';

interface ListSkeletonProps {
  items?: number;
  size?: 'normal' | 'small';
}

export const ListSkeleton: FC<ListSkeletonProps> = ({
  items = 5,
  size = 'normal',
}) => {
  return (
    <>
      {Array.from({ length: items }).map((_, index) => (
        <TableRow key={String(index)} sx={{ padding: '0' }}>
          <TableCell
            colSpan={999}
            sx={{
              height: size === 'normal' ? '65px' : undefined,
              padding: '14px 24px',
            }}
          >
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
