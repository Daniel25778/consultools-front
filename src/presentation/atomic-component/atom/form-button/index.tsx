import type { SxProps } from '@mui/material';
import { Button, CircularProgress } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';

interface FormButtonProps {
  label: string;
  loadingText?: string;
  isSubmitting: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
  variant?: 'contained' | 'outlined';
  loadingColor?: string;
  startIcon?: ReactNode;
  sx?: SxProps;
  id?: string;
  hideProgress?: boolean;
}

export const FormButton: FC<FormButtonProps> = ({
  isSubmitting,
  loadingText,
  color,
  disabled,
  loadingColor,
  label,
  startIcon,
  id,
  variant,
  sx,
  hideProgress
}) => (
  <Button
    className={'w-full flex gap-2 min-h-[43px]'}
    color={color}
    disabled={disabled}
    id={id ?? 'form-button'}
    startIcon={startIcon}
    sx={sx}
    type={isSubmitting ? 'button' : 'submit'}
    variant={variant ?? 'contained'}
  >
    {isSubmitting && !hideProgress ? (
      <span className={'h-[28px] flex items-center'}>
        <CircularProgress
          size={24}
          sx={{
            svg: {
              color: `${loadingColor ?? colors.white} !important`
            }
          }}
          thickness={5}
        />
      </span>
    ) : null}

    {isSubmitting ? <span>{loadingText ?? ''}</span> : <span>{label}</span>}
  </Button>
);
