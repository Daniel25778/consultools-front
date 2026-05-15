import { Table, TableContainer } from '@mui/material';
import { Pagination } from 'presentation/atomic-component/molecule/pagination';
import type { FC, ReactNode } from 'react';

interface TableTemplateProps {
  tableHeader: ReactNode;
  tableBody: ReactNode;
  height?: number | string;
  maxHeight?: number | string;
  pagination?: {
    page: number;
    limit?: number;
    handleChangePage: (newPage: number) => void;
    handleChangeLimit?: (newPage: number) => void;
    totalElements?: number;
    totalPages?: number;
  };
}

export const TableTemplate: FC<TableTemplateProps> = ({
  tableHeader,
  tableBody,
  maxHeight,
  height,
  pagination
}) => {
  const hasPagination = pagination ?? false;

  const getTable = (): ReactNode => {
    return (
      <TableContainer
        className={'overflow-auto laptop:max-w-[calc(100dvw-168px)]'}
        sx={{ height, maxHeight }}
      >
        <Table stickyHeader sx={{ position: 'relative' }}>
          {tableHeader}
          {tableBody}
        </Table>
      </TableContainer>
    );
  };

  if (!hasPagination)
    return (
      <div className={'flex flex-col border'} id={'table'}>
        {getTable()}
      </div>
    );

  const { handleChangePage, page, handleChangeLimit, limit, totalElements, totalPages } =
    hasPagination;

  return (
    <div className={'flex flex-col border'} id={'table'}>
      {getTable()}

      {totalPages && totalPages > 0 ? (
        <div className={'p-4 border-t'}>
          <Pagination
            handleChangeLimit={handleChangeLimit}
            handleChangePage={handleChangePage}
            limit={limit}
            page={page}
            scrollId={'table'}
            totalElements={totalElements ?? 0}
            totalPages={totalPages ?? 0}
          />
        </div>
      ) : null}
    </div>
  );
};
