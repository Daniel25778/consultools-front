import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import type { FC } from 'react';
import type { Sort } from 'domain/protocol';

interface SortFilterProps {
  filterName: string;
  sort: Sort;
  sortBy: string | null;
  onChangeSort: (sort: Sort) => void;
}

export const SortFilter: FC<SortFilterProps> = ({ filterName, onChangeSort, sort, sortBy }) => {
  if (sort === 'DESC' && sortBy === filterName)
    return (
      <div
        className={'hover:bg-gray-200 rounded-md cursor-pointer'}
        onClick={(): void => {
          if (onChangeSort) onChangeSort(null);
        }}
      >
        <ArrowUpward className={'text-gray-600 hover:cursor-pointer'} sx={{ fontSize: '22px' }} />
      </div>
    );
  if (sort === 'ASC' && sortBy === filterName)
    return (
      <div
        className={'hover:bg-gray-200 rounded-md cursor-pointer'}
        onClick={(): void => {
          if (onChangeSort) onChangeSort('DESC');
        }}
      >
        <ArrowDownward className={'text-gray-600 hover:cursor-pointer'} sx={{ fontSize: '22px' }} />
      </div>
    );

  return (
    <div
      className={'hover:bg-gray-200 rounded-md cursor-pointer'}
      onClick={(): void => {
        if (onChangeSort) onChangeSort('ASC');
      }}
    >
      <SwapVert className={'text-gray-600 hover:cursor-pointer'} sx={{ fontSize: '22px' }} />
    </div>
  );
};
