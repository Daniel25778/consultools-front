import type { UseQueryResult } from '@tanstack/react-query';
import type { FindProductQuery } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindProductQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindProductQuery> =>
  useFindQuery<FindProductQuery>({ ...props, route: 'product' });
