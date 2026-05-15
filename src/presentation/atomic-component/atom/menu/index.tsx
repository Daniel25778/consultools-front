import { Menu as MenuUI } from '@mui/material';
import type {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import { useEffect, useState } from 'react';

interface HeadingProps {
  openElement?: ReactNode;
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isDown?: boolean;
}

export const Menu: FC<HeadingProps> = ({
  openElement,
  children,
  isOpen,
  setIsOpen,
  isDown,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isOpen) setAnchorEl(null);
  }, [isOpen]);

  return (
    <>
      <span
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup={'true'}
        onClick={handleClick}
      >
        {openElement}
      </span>

      <MenuUI
        PaperProps={{
          elevation: 2,
          sx: {
            backgroundColor: 'white',
          },
        }}
        anchorEl={anchorEl}
        anchorOrigin={
          isDown
            ? { horizontal: 'center', vertical: 'bottom' }
            : { horizontal: 'right', vertical: 'top' }
        }
        disableRestoreFocus
        id={'menu'}
        onClose={handleClose}
        open={open}
        transformOrigin={
          isDown
            ? { horizontal: 'center', vertical: 'top' }
            : { horizontal: 'left', vertical: 'top' }
        }
      >
        {children}
      </MenuUI>
    </>
  );
};
