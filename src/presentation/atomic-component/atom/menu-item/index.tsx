import { Link, type To } from 'react-router-dom';
import { ListItemButton } from '@mui/material';
import type { FC, MouseEvent, ReactElement, ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material';

interface MenuItemProps {
  icon: ReactElement;
  title: ReactElement | string;
  onClick?: (event: MouseEvent) => Promise<void> | void;
  sx?: SxProps<Theme>;
  to?: To;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, sx, title, to, onClick }) => {
  const getItem = (): ReactNode => {
    return (
      <ListItemButton
        onClick={onClick}
        sx={{
          gap: '12px',
          padding: '8px 16px',
          ...sx
        }}
      >
        {icon}
        <span>{title}</span>
      </ListItemButton>
    );
  };

  if (to) return <Link to={to}>{getItem()}</Link>;

  return getItem();
};
