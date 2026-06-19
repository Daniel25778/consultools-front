import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { useModalProps } from 'data/hooks';
import { colors } from 'presentation/style';
import type { FC } from 'react';

interface FloatButtonProps {
  modal: useModalProps;
}

export const FloatButton: FC<FloatButtonProps> = ({ modal }) => {
  return (
    <IconButton
      onClick={modal.openModal}
      sx={{
        position: 'fixed',
        bottom: 90,
        right: 24,
        padding: '15px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: colors.primary,
        zIndex: 9,
        '&:hover': {
          backgroundColor: colors.primary,
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)'
        },

        transition: 'all 0.2s ease',
        display: {
          xs: 'flex',
          sm: 'flex',
          md: 'none'
        }
      }}
    >
      <Add fontSize={'medium'} className={'hover:cursor-pointer text-white'} />
    </IconButton>
  );
};
