import { type FC, useState } from 'react';
import { SortFilter } from 'presentation/atomic-component/atom/sort-filter';
import type { Sort } from 'domain/protocol';
import type { TableSortFilter } from 'store/filters/slice';

export interface TableSortProps {
  title: string;
  filterName: string;
  sortItem?: TableSortFilter;
  align?: 'center' | 'left';
}

export const TableSort: FC<TableSortProps> = ({ title, filterName, sortItem, align }) => {
  const [visible, setVisible] = useState(false);

  const onClick = (): void => {
    if (sortItem) {
      const newSort: Record<string, Sort> = {
        ASC: 'DESC',
        DESC: null,
        null: 'ASC'
      };

      sortItem?.onChangeSort(newSort[String(sortItem.sort as 'ASC')]);
    }
  };

  return (
    <div
      className={`flex gap-1 cursor-pointer relative items-center ${align === 'center' ? 'justify-center' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      title={title}
    >
      <h3 className={`line-clamp-1 ${visible ? 'text-gray-600' : ''}`}>{title}</h3>

      {(sortItem?.sortBy === filterName || visible) && sortItem ? (
        <div className={'absolute right-0'}>
          <SortFilter filterName={filterName} {...sortItem} />
        </div>
      ) : null}

      <div className={'w-[22px]'} />
    </div>
  );
};
