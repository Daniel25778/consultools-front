import type { UseQueryResult } from '@tanstack/react-query';
import type { Company, FindCompanyQuery } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindCompanyQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindCompanyQuery> =>
  useFindQuery<FindCompanyQuery>({ ...props, route: 'company' });

export const useFindOneCompanyQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Company> =>
  useFindQuery<Company>({ ...props, route: 'company' });
