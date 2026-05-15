import { BodyCell } from 'presentation/atomic-component/atom';
import { Check, Close, EditOutlined } from '@mui/icons-material';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { IconButton, TableBody, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { ListSkeleton } from 'presentation/atomic-component/atom/skeleton';
import { QueryName, apiPaths, paths } from 'main/config';
import { Role, roleTranslate } from 'domain/enums';
import { formatText, inRole, isLoadingQuery } from 'main/utils';
import type { FC } from 'react';
import type { FindUserQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';

interface UserTableBodyProps {
  query: UseQueryResult<FindUserQuery>;
}

export const UserTableBody: FC<UserTableBodyProps> = ({ query }) => {
  return (
    <TableBody className={'relative'}>
      {isLoadingQuery(query) ? (
        <ListSkeleton items={5} />
      ) : (
        <>
          {query?.data?.content?.map((item) => (
            <TableRow key={item.userId} className={'cursor-pointer'} hover sx={{ height: '65px' }}>
              <BodyCell clamp={2} title={item.name} />
              <BodyCell title={formatText(item.celPhone, 'phone')} />
              <BodyCell clamp={1} title={item.email?.toLowerCase()} />
              <BodyCell title={roleTranslate?.[item.profiles?.[0]]} />

              {inRole([Role.ADMIN]) ? (
                <BodyCell
                  align={'center'}
                  title={
                    <DeleteConfirmationModal
                      color={item.enable ? 'error' : 'success'}
                      deleteText={item.enable ? 'Desabilitar' : 'Habilitar'}
                      id={item.userId}
                      isPatch
                      openElement={
                        <div className={'flex justify-center mr-[22px]'}>
                          <div
                            className={`p-1.5 px-2 w-min rounded-md ${item.enable ? 'bg-green text-light-green' : 'bg-red'}`}
                          >
                            {item.enable ? (
                              <Check fontSize={'small'} />
                            ) : (
                              <Close fontSize={'small'} />
                            )}
                          </div>
                        </div>
                      }
                      queryName={QueryName.user}
                      route={apiPaths.user}
                      successMessage={'Atualizado com sucesso'}
                      text={
                        <span>
                          Deseja {item.enable ? 'Desabilitar' : 'Habilitar'} o usuário {item.name}?
                        </span>
                      }
                      title={`${item.enable ? 'Desabilitar' : 'Habilitar'} Usuário`}
                    />
                  }
                />
              ) : (
                <BodyCell
                  align={'center'}
                  title={
                    <div className={'flex justify-center mr-[22px]'}>
                      <div
                        className={`p-1.5 px-2 w-min rounded-md ${item.enable ? 'bg-green text-light-green' : 'bg-red'}`}
                      >
                        {item.enable ? <Check fontSize={'small'} /> : <Close fontSize={'small'} />}
                      </div>
                    </div>
                  }
                />
              )}

              {inRole([Role.ADMIN]) ? (
                <BodyCell
                  align={'center'}
                  sx={{ padding: '6px 18px' }}
                  title={
                    <Link to={paths.editUser({ userId: item.userId })}>
                      <IconButton>
                        <EditOutlined />
                      </IconButton>
                    </Link>
                  }
                />
              ) : null}
            </TableRow>
          ))}

          {query?.data?.content?.length === 0 ? (
            <TableRow>
              <BodyCell
                align={'center'}
                colSpan={999}
                sx={{ fontWeight: 500, padding: '20px' }}
                title={'Nenhum usuário encontrado'}
              />
            </TableRow>
          ) : null}
        </>
      )}
    </TableBody>
  );
};
