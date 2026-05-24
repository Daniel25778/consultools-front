import type { UseQueryResult } from '@tanstack/react-query';
import type { FindProductQuery, ProductDetails } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindProductQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindProductQuery> =>
  useFindQuery<FindProductQuery>({ ...props, route: 'product' });

export const useFindOneProductQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<ProductDetails> =>
  useFindQuery<ProductDetails>({ ...props, route: 'product' });
