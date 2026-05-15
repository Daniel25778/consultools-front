import { DarkMode, LightMode } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';
import { useTheme } from 'data/hooks';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from 'store/persist/slice';

export const ToggleTheme: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <ListItemButton
      onClick={(): void => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
      }}
      sx={{
        padding: '7px',
        borderRadius: '6px',
        border: `1px solid ${theme === 'dark' ? colors.gray[50] : colors.gray[600]}`
      }}
    >
      {theme === 'dark' ? (
        <LightMode
          style={{
            color: colors.gray[50]
          }}
        />
      ) : (
        <DarkMode
          style={{
            color: colors.gray[600]
          }}
        />
      )}
    </ListItemButton>
  );
};
