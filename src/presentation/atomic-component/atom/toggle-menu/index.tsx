import { Close, KeyboardDoubleArrowRight, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useWindowDimensions } from 'data/hooks';
import { dimensions } from 'main/config';
import type { FC } from 'react';
import { useSidebar } from 'store/sidebar/selector';

export const ToggleMenu: FC = () => {
  const { open, setOpen } = useSidebar();
  const { width } = useWindowDimensions();

  return (
    <IconButton className={'text-gray-700 dark:text-white'} onClick={(): void => setOpen(!open)}>
      {width >= dimensions.laptop ? (
        <KeyboardDoubleArrowRight
          className={`${open ? 'rotate-180' : ''}`}
          style={{ transition: 'all 500ms' }}
        />
      ) : (
        <>{open ? <Close /> : <Menu />}</>
      )}
    </IconButton>
  );
};
