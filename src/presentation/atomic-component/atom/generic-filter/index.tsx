import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { LabelInput } from '..';
import { useDebounce } from 'data/hooks';
import { useState } from 'react';
import type { Dispatch, FC, SetStateAction } from 'react';

interface GenericFilterProps {
  filterValue?: string | null;
  mask?: string;
  onChange: (value: string) => void;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  autoFocus?: boolean;
}

export const GenericFilter: FC<GenericFilterProps> = ({
  filterValue,
  mask,
  onChange,
  autoFocus,
  setOpen
}) => {
  const [search, setSearch] = useState(filterValue || '');

  useDebounce(
    () => {
      if (filterValue !== search) onChange(search);
    },
    [search],
    500
  );

  return (
    <LabelInput
      EndIcon={
        <InputAdornment position={'end'} title={'Limpar'}>
          <IconButton onClick={(): void => setSearch('')} tabIndex={-1}>
            <Clear />
          </IconButton>
        </InputAdornment>
      }
      StartIcon={
        <InputAdornment position={'start'}>
          <Search />
        </InputAdornment>
      }
      autoFocus={typeof autoFocus === 'boolean' ? autoFocus : true}
      mask={mask}
      onChange={(event): void => {
        setSearch(event.target.value);
      }}
      onKeyUp={(event): void => {
        if (event.key === 'Enter' && setOpen) setOpen(false);
      }}
      placeholder={'Pesquisar'}
      value={search}
    />
  );
};
