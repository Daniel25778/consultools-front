import type { TableCellProps } from '@mui/material';
import { TableCell } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';
import type { To } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface BodyCellProps extends Pick<TableCellProps, 'sx'> {
  title: ReactNode | number | string;
  className?: string;
  link?: To;
  firstRow?: boolean;
  colSpan?: number;
  linkPadding?: string;
  linkHeight?: string;
  clamp?: 1 | 2 | 3;
  backgroundColor?: string;
  hasMargin?: boolean;
  align?: 'center' | 'left' | 'right';
  size?: 'normal' | 'small';
  onClick?: () => void;
}

export const BodyCell: FC<BodyCellProps> = ({
  title,
  onClick,
  className,
  clamp = 2,
  size = 'normal',
  hasMargin,
  link,
  linkHeight,
  firstRow,
  backgroundColor,
  colSpan,
  linkPadding,
  sx,
  align
}) => {
  const lineClamp = (): '' | 'line-clamp-1' | 'line-clamp-2' | 'line-clamp-3' => {
    if (clamp) return `line-clamp-${clamp}`;

    return '';
  };

  return (
    <TableCell
      align={align ?? 'left'}
      colSpan={colSpan}
      component={'th'}
      onClick={onClick}
      scope={'row'}
      sx={{
        backgroundColor,
        borderBottom: '0px',
        borderTop: firstRow ? undefined : `1px solid ${colors.gray[100]}`,
        height: '100%',
        padding: link ? '0' : '12px 18px',
        ...sx
      }}
      title={typeof title === 'string' ? title : undefined}
      variant={'body'}
    >
      {link ? (
        <Link
          className={`flex items-center bg-pr imary
            ${hasMargin ? 'pr-[22px]' : ''} 
            ${align === 'center' ? 'justify-center' : ''}
            `}
          style={{
            height: linkHeight || (size === 'normal' ? '65px' : '42px'),
            padding: linkPadding
          }}
          to={link}
        >
          <span
            className={`px-1.5 items-center break-words w-full
              ${align === 'center' ? 'justify-center' : ''} 
              ${lineClamp()} 
              ${className}
              `}
          >
            {title}
          </span>
        </Link>
      ) : (
        <span
          className={`items-center break-words 
            ${align === 'center' ? 'justify-center' : ''} 
            ${hasMargin ? 'mr-[22px]' : ''} 
            ${lineClamp()} 
            ${className}
            `}
        >
          {title}
        </span>
      )}
    </TableCell>
  );
};
