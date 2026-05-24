import type { UseQueryResult } from '@tanstack/react-query';
import type { FindStoppingReasonQuery, StoppingReasonDetails } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindStoppingReasonQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindStoppingReasonQuery> =>
  useFindQuery<FindStoppingReasonQuery>({ ...props, route: 'product' });

export const useFindOneStoppingReasonQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<StoppingReasonDetails> =>
  useFindQuery<StoppingReasonDetails>({ ...props, route: 'stoppingReason' });
