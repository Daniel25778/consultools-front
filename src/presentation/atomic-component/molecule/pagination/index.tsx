import {
  ArrowDropDown,
  FirstPageOutlined,
  LastPageOutlined,
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from '@mui/icons-material';
import { useCustomPagination, useWindowDimensions } from 'data/hooks';
import { dimensions } from 'main/config';
import { scrollTo } from 'main/utils';
import { SimpleMenu } from 'presentation/atomic-component/atom/simple-menu';
import { type FC, type ReactNode, useState } from 'react';
import { PaginationItem } from './item';

interface PaginationProps {
  page: number;
  limit?: number;
  totalElements?: number;
  totalPages?: number;
  handleChangePage: (newPage: number) => void;
  handleChangeLimit?: (newLimit: number) => void;
  scrollId?: string;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  limit,
  totalPages = 1,
  totalElements,
  handleChangeLimit,
  scrollId,
  handleChangePage,
}: PaginationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  const { items } = useCustomPagination({
    boundaryCount: width < dimensions.tablet ? 1 : undefined,
    totalPages,
    onChange(newPage): void {
      handleChangePage(newPage);
      if (scrollId) scrollTo(scrollId);
    },
    page,
    siblingCount: width < dimensions.tablet ? 0 : undefined,
  });

  const card = (number: number): ReactNode => (
    <div
      className={`flex flex-col min-w-[35px] items-center p-0.5 w-[40px] px-2 cursor-pointer ${number === limit ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
      onClick={() => {
        if (handleChangeLimit) handleChangeLimit(number);
        setIsOpen(false);
      }}
    >
      {number}
    </div>
  );

  const list = (): ReactNode => {
    if (totalElements)
      return (
        <div className={'flex flex-col items-center divide-y divide-gray-350'}>
          {card(5)}
          {card(10)}
          {card(15)}
          {card(20)}
          {card(25)}
          {card(30)}
        </div>
      );

    return null;
  };

  return (
    <div className={'flex flex-col-reverse gap-5 tablet:flex-row-reverse'}>
      {totalPages && totalPages > 0 ? (
        <div className={'flex flex-wrap gap-1 justify-end'}>
          {items.map(({ type, page, selected, disabled }, index) => {
            const getText = (): ReactNode | string | undefined => {
              switch (type) {
                case 'first':
                  return (
                    <FirstPageOutlined color={'inherit'} fontSize={'small'} />
                  );
                case 'prev':
                  return (
                    <NavigateBeforeOutlined
                      color={'inherit'}
                      fontSize={'small'}
                    />
                  );
                case 'page':
                  return page;
                case 'end-ellipsis':
                  return '...';
                case 'start-ellipsis':
                  return '...';
                case 'next':
                  return (
                    <NavigateNextOutlined
                      color={'inherit'}
                      fontSize={'small'}
                    />
                  );
                case 'last':
                  return (
                    <LastPageOutlined color={'inherit'} fontSize={'small'} />
                  );
                default:
                  return undefined;
              }
            };

            return (
              <PaginationItem
                key={index}
                disabled={disabled ?? false}
                isEllipsis={type.endsWith('ellipsis')}
                selected={selected ?? false}
              >
                {getText()}
              </PaginationItem>
            );
          })}
        </div>
      ) : null}

      {handleChangeLimit && limit && totalElements ? (
        <div
          className={
            'flex gap-2 items-center text-sm text-gray-600 font-medium'
          }
        >
          <span>Linhas por Página</span>

          <SimpleMenu
            isOpen={isOpen}
            openElement={
              <div
                className={
                  'flex gap- border rounded-md border-gray-300 min-w-[51px] justify-between pl-2 items-center bg-white cursor-pointer'
                }
              >
                <span>{limit}</span>
                <ArrowDropDown />
              </div>
            }
            radius={'2px'}
            setIsOpen={setIsOpen}
            side={'bottom'}
          >
            {list()}
          </SimpleMenu>

          <span>
            {(page - 1) * limit + 1}-{Math.min(page * limit, totalElements)} de{' '}
            {totalElements}
          </span>
        </div>
      ) : null}
    </div>
  );
};
