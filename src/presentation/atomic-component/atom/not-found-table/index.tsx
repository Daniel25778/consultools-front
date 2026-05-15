import { TableCell, TableRow } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';

interface NotFoundTableProps {
  children: ReactNode;
}

export const NotFoundTable: FC<NotFoundTableProps> = ({ children }) => {
  return (
    <TableRow sx={{ height: '45px' }}>
      <TableCell
        align={'center'}
        colSpan={500}
        sx={{ backgroundColor: colors.gray[150], borderColor: 'white', padding: 0 }}
      >
        {children}
      </TableCell>
    </TableRow>
  );
};
