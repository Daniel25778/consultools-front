import { Close, FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { voidFunction } from 'main/utils';
import { Menu } from 'presentation/atomic-component/atom/menu';
import {
  Select,
  type SelectValues,
} from 'presentation/atomic-component/atom/select';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import type { FC } from 'react';
import { useState } from 'react';

import type { TableSortFilter } from 'store/filters/slice';

export interface SelectTableFilterProps {
  title: string;
  onChange: (value: SelectValues | SelectValues[] | null) => void;
  onSearch?: (value: string) => void;
  isMultiple?: boolean;
  filterName: string;
  filterValue: SelectValues | SelectValues[] | null;
  options: SelectValues[];
  sortItem?: TableSortFilter;
  query?: {
    fetchNextPage: (
      options?: FetchNextPageOptions | undefined,
    ) => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };
}

export const SelectTableFilter: FC<SelectTableFilterProps> = ({
  title,
  onChange,
  options,
  filterName,
  onSearch,
  isMultiple,
  query,
  filterValue,
  sortItem,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={'flex justify-center gap-2 items-center w-full'}>
      <span>{title}</span>

      <div>
        <Menu
          isDown
          isOpen={open}
          openElement={
            <div className={'max-w-[40px] relative'}>
              <IconButton onClick={voidFunction}>
                <FilterAlt />
              </IconButton>

              {filterValue !== null ||
              (Array.isArray(filterValue) &&
                (filterValue as unknown as SelectValues[])?.length > 0) ? (
                <div
                  className={
                    'bg-primary p-1 w-5 h-5 flex justify-center items-center rounded-full text-white absolute right-[-3px] top-[-3px] z-10'
                  }
                >
                  {Array.isArray(filterValue) ? filterValue.length : '1'}
                </div>
              ) : null}
            </div>
          }
          setIsOpen={setOpen}
        >
          <div
            className={
              'bg-white flex flex-col gap-3 p-4 py-6 min-h-max laptop:min-w-[350px] laptop:max-w-[350px] border-2 shadow-md'
            }
          >
            <div className={'flex items-center justify-between w-full'}>
              <div
                className={'flex gap-3 items-center text-gray-500 font-bold'}
              >
                <span className={'text-base'}>ﾠ{title}</span>
                {sortItem ? (
                  <SortFilter filterName={filterName} {...sortItem} />
                ) : null}
              </div>

              <IconButton
                onClick={(): void => {
                  setOpen(false);
                }}
                title={'Fechar'}
              >
                <Close className={'hover:cursor-pointer text-gray-500'} />
              </IconButton>
            </div>

            <Select
              id={title}
              isMultiple={isMultiple}
              label={'Pesquisar'}
              onChange={(value) => {
                onChange(value || (isMultiple ? [] : null));
                if (!isMultiple) setOpen(false);
              }}
              onSearch={onSearch}
              options={options}
              query={query}
              value={filterValue}
            />
          </div>
        </Menu>
      </div>
    </div>
  );
};
