import { Close, KeyboardDoubleArrowRight, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useWindowDimensions } from 'data/hooks';
import { dimensions } from 'main/config';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { useSidebar } from 'store/persist/selector';

export const ToggleMenu: FC = () => {
  const { open, setOpen } = useSidebar();
  const { width } = useWindowDimensions();

  return (
    <IconButton
      style={{
        borderColor: colors.gray[300],
        borderWidth: '0.5px',
        borderStyle: `${width >= dimensions.laptop ? 'solid' : 'none'}`,
        padding: '2px',
        backgroundColor: colors.white,
        color: colors.gray[700]
      }}
      className={`absolute rounded-full ${width >= dimensions.laptop && open ? 'left-[28px]' : 'left-[-5px]'}`}
      onClick={(): void => setOpen(!open)}
    >
      {width >= dimensions.laptop ? (
        <>
          <div style={{ fontSize: '0.5rem' }}>
            <KeyboardDoubleArrowRight
              className={`${open ? 'rotate-180' : ''}`}
              sx={{ fontSize: '18px', padding: '0px' }}
            />
          </div>
        </>
      ) : (
        <>{open ? <Close /> : <Menu />}</>
      )}
    </IconButton>
  );
};
