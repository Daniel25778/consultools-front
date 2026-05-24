import type { UseQueryResult } from '@tanstack/react-query';
import type { FindResponsibleAreaQuery } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindResponsibleAreaQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindResponsibleAreaQuery> =>
  useFindQuery<FindResponsibleAreaQuery>({ ...props, route: 'responsibleArea' });
