import { Button } from '@mui/material';
import type {
  QueryObserverResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { BodyCell } from 'presentation/atomic-component/atom/table/body-cell';
import type { FC, ReactNode } from 'react';

interface QueryManagerProps {
  query: UseQueryResult;
  children: ReactNode;
  hideError?: boolean;
}

export const QueryManager: FC<QueryManagerProps> = ({
  query,
  children,
  hideError,
}) => {
  const data = query.data as { firstLoading: boolean };

  if (data?.firstLoading) return <LoadingPage hasShadow />;

  if (query.isError && !hideError)
    return (
      <BodyCell
        colSpan={1000}
        title={
          <div
            className={
              'flex flex-col gap-2 pt-4 h-full w-full items-center justify-center '
            }
          >
            <h1>Parece que houve um erro ao carregar os dados.</h1>

            <Button
              onClick={(): Promise<QueryObserverResult> => query.refetch()}
              variant={'outlined'}
            >
              Tentar novamente
            </Button>

            <div />
          </div>
        }
      />
    );

  return children;
};
