import { HeaderCell } from 'presentation/atomic-component/atom';
import { Role } from 'domain/enums';
import { TableHead, TableRow } from '@mui/material';
import { TableSort } from 'presentation/atomic-component/atom/table-filter';
import { inRole, setSortFilter } from 'main/utils';
import type { FC } from 'react';

export const UserTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell
          minWidth={160}
          title={
            <TableSort
              align={'left'}
              filterName={'name'}
              sortItem={setSortFilter('user', 'name')}
              title={'Nome'}
            />
          }
        />

        <HeaderCell
          minWidth={150}
          title={
            <TableSort
              filterName={'celPhone'}
              sortItem={setSortFilter('user', 'celPhone' as 'name')}
              title={'Celular'}
            />
          }
          width={150}
        />

        <HeaderCell
          minWidth={380}
          title={
            <TableSort
              filterName={'email'}
              sortItem={setSortFilter('user', 'email' as 'name')}
              title={'E-mail'}
            />
          }
          width={380}
        />

        <HeaderCell minWidth={180} title={'Perfil'} width={180} />

        <HeaderCell
          minWidth={80}
          title={
            <TableSort
              align={'center'}
              filterName={'enable'}
              sortItem={setSortFilter('user', 'enable' as 'name')}
              title={'Habilitado'}
            />
          }
          width={80}
        />

        {inRole([Role.ADMIN]) ? <HeaderCell minWidth={80} title={'Ações'} width={80} /> : null}
      </TableRow>
    </TableHead>
  );
};
