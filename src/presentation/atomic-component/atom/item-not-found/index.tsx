import { TableCell } from '@mui/material';
import type { FC } from 'react';

export const ItemNotFound: FC = () => {
  return (
    <TableCell
      colSpan={100}
      sx={{
        border: 0,
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      Nenhum item encontrado
    </TableCell>
  );
};
