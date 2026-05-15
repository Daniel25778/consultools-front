import { MoreHoriz } from '@mui/icons-material';
import { Menu } from '@mui/material';
import { useTheme } from 'data/hooks';
import { colors } from 'presentation/style';
import type {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import { useEffect, useState } from 'react';

interface SimpleMenuProps {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  openElement?: ReactNode;
  side?: 'bottom' | 'left' | 'right' | 'top';
  id?: string;
  radius?: string;
}

export const SimpleMenu: FC<SimpleMenuProps> = ({
  children,
  isOpen,
  setIsOpen,
  radius,
  id,
  side,
  openElement,
}) => {
  const menuId = `menu-element-${String(Math.random() * 1000).replace('.', '')}`;
  const itemId = id
    ? `open-menu-element-${id}`
    : `open-menu-element-${String(Math.random() * 1000).replace('.', '')}`;

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    if (setIsOpen) setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    if (setIsOpen) setIsOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isOpen !== undefined) if (!isOpen) setAnchorEl(null);
  }, [isOpen]);

  const getAnchorOrigin = (): {
    horizontal: 'center' | 'left' | 'right';
    vertical: 'bottom' | 'center' | 'top';
  } => {
    switch (side) {
      case 'right':
        return { horizontal: 'right', vertical: 'top' };
      case 'left':
        return { horizontal: 'left', vertical: 'top' };
      case 'bottom':
        return { horizontal: 'center', vertical: 'bottom' };
      default:
        return { horizontal: 'center', vertical: 'top' };
    }
  };

  const getTransformOrigin = (): {
    horizontal: 'center' | 'left' | 'right';
    vertical: 'bottom' | 'center' | 'top';
  } => {
    switch (side) {
      case 'right':
        return { horizontal: 'left', vertical: 'top' };
      case 'left':
        return { horizontal: 'right', vertical: 'top' };
      case 'bottom':
        return { horizontal: 'center', vertical: 'top' };
      default:
        return { horizontal: 'center', vertical: 'bottom' };
    }
  };

  return (
    <div>
      {openElement ? (
        <div
          className={'flex w-full'}
          id={itemId}
          onClick={(event): void => {
            event.stopPropagation();
            handleClick(event);
          }}
        >
          {openElement}
        </div>
      ) : (
        <button
          id={itemId}
          onClick={(event): void => {
            event.stopPropagation();
            handleClick(event);
          }}
          type={'button'}
        >
          <MoreHoriz />
        </button>
      )}

      <div
        className={'hidden'}
        id={`${itemId}-close`}
        onClick={(event): void => {
          event.stopPropagation();
          handleClose();
        }}
      />

      <Menu
        MenuListProps={{
          'aria-labelledby': 'button',
          sx: {
            backgroundColor: 'transparent',
            padding: '0',
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: theme === 'light' ? 'white' : colors.gray[800],
            borderRadius: radius ?? '10px',
            boxShadow: '0px 0px 12px 2px #00000021',
            color: theme === 'light' ? 'black' : 'white',
          },
        }}
        anchorEl={anchorEl}
        anchorOrigin={getAnchorOrigin()}
        id={menuId}
        onClick={(event): void => {
          event.stopPropagation();
        }}
        onClose={handleClose}
        open={open}
        transformOrigin={getTransformOrigin()}
      >
        {children}
      </Menu>
    </div>
  );
};
