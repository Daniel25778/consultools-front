import type { TableCellProps } from '@mui/material';
import { TableCell } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';

interface HeaderCellProps extends Pick<TableCellProps, 'sx'> {
  title: ReactNode | number | string;
  width?: number | string;
  minWidth?: number | string;
  first?: boolean;
  last?: boolean;
  maxWidth?: number | string;
  align?: 'center' | 'left' | 'right';
  className?: string;
  backgroundColor?: string;
}

export const HeaderCell: FC<HeaderCellProps> = ({
  title,
  className,
  width,
  maxWidth,
  first,
  last,
  sx,
  backgroundColor,
  align,
  minWidth
}) => {
  let borderRadius = '';

  if (first) borderRadius = '10px 0px 0px 10px';
  else if (last) borderRadius = '0px 10px 10px 00px';

  return (
    <TableCell
      align={align ?? 'left'}
      className={className}
      sx={{
        backgroundColor: backgroundColor ?? colors.gray[50],
        borderBottom: `1px solid ${colors.gray[100]}`,
        borderLeft: first ? `1px solid ${colors.gray[100]}` : undefined,
        borderRadius,
        borderRight: last ? `1px solid ${colors.gray[100]}` : undefined,
        borderTop: `1px solid ${colors.gray[100]}`,
        fontSize: '14px',
        fontWeight: '600',
        maxWidth,
        minWidth: minWidth ?? 90,
        padding: '10px 18px',
        ...sx
      }}
      variant={'head'}
      width={width}
    >
      {title}
    </TableCell>
  );
};
