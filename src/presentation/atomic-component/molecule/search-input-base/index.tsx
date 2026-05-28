import { Search } from '@mui/icons-material';
import { InputBase, Paper } from '@mui/material';
import { colors } from 'presentation/style/palette';
import type { ChangeEvent, FC } from 'react';

interface SearchInputBaseProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const SearchInputBase: FC<SearchInputBaseProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...'
}) => {
  return (
    <Paper
      elevation={0}
      className={
        'flex items-center w-full tablet:min-w-[400px] tablet:max-w-[400px] gap-2 rounded-full px-6 py-1'
      }
      sx={{
        border: `1.5px solid ${colors.gray[100]}`,
        backgroundColor: colors.white,
        borderRadius: '9999px',
        boxShadow: 'none'
      }}
    >
      <InputBase
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        inputProps={{ 'aria-label': placeholder }}
        sx={{
          fontSize: '1rem',
          color: colors.gray[900],
          '& input::placeholder': { color: colors.gray[500], opacity: 1 }
        }}
      />
      <Search sx={{ color: colors.gray[800], fontSize: 24 }} />
    </Paper>
  );
};
