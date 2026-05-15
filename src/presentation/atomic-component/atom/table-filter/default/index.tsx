import { Close, FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { voidFunction } from 'main/utils';
import { GenericFilter } from 'presentation/atomic-component/atom/generic-filter';
import { Menu } from 'presentation/atomic-component/atom/menu';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import type { FC } from 'react';
import { useState } from 'react';
import type { TableSortFilter } from 'store/filters/slice';

export interface TableFilterProps {
  title: string;
  onChange: (value: string) => void;
  filterName: string;
  filterValue: string;
  mask?: string;
  sortItem?: TableSortFilter;
}

export const TableFilter: FC<TableFilterProps> = ({
  title,
  onChange,
  mask,
  filterName,
  filterValue,
  sortItem,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={'flex items-center justify-between'}>
      <h3 className={'font-semibold'}>{title}</h3>

      <Menu
        isDown
        isOpen={open}
        openElement={
          <div className={'max-w-[40px] relative'}>
            <IconButton onClick={voidFunction}>
              <FilterAlt />
            </IconButton>

            {filterValue ? (
              <div
                className={
                  'bg-primary p-1 w-5 h-5 flex justify-center items-center rounded-full text-white absolute right-[-3px] top-[-3px] z-10'
                }
              >
                1
              </div>
            ) : null}
          </div>
        }
        setIsOpen={setOpen}
      >
        <div
          className={
            'bg-white flex flex-col gap-6 p-4 py-6 min-h-max laptop:min-w-[300px]'
          }
        >
          <div className={'flex items-center justify-between w-full'}>
            <div className={'flex gap-3 items-center text-gray-500 font-bold'}>
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

          <GenericFilter
            filterValue={filterValue}
            mask={mask}
            onChange={onChange}
            setOpen={setOpen}
          />
        </div>
      </Menu>
    </div>
  );
};
