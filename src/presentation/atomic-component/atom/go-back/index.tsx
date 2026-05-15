import { Button } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';
import type { FC } from 'react';

export const GoBack: FC = () => {
  return (
    <Button
      color={'info'}
      onClick={(): void => window.history.back()}
      sx={{
        height: '43px',
        minWidth: '43px',
        width: '43px'
      }}
      variant={'contained'}
    >
      <NavigateBefore />
    </Button>
  );
};
