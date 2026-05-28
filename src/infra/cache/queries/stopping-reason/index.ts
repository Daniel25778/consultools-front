import type { UseQueryResult } from '@tanstack/react-query';
import type { FindStoppingReasonQuery } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindStoppingReasonQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindStoppingReasonQuery> =>
  useFindQuery<FindStoppingReasonQuery>({ ...props, route: 'stoppingReason' });
