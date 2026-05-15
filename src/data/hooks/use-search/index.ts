import { useDebounce } from 'data/hooks/use-debounce';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export const useSearch = (
  startValue?: string
): {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchDebounce: string;
  setSearchDebounce: Dispatch<SetStateAction<string>>;
} => {
  const [searchDebounce, setSearchDebounce] = useState(startValue ?? '');
  const [search, setSearch] = useState(startValue ?? '');

  useDebounce(
    () => {
      setSearch(searchDebounce);
    },
    [searchDebounce],
    500
  );

  return { search, searchDebounce, setSearch, setSearchDebounce };
};
