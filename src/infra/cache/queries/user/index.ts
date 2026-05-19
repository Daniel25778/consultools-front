import type { UseQueryResult } from '@tanstack/react-query';
import type { FindUserQuery, User } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindUserQuery = ({ ...props }: useFindQueryProps): UseQueryResult<FindUserQuery> =>
  useFindQuery<FindUserQuery>({ ...props, route: 'user' });

export const useFindOneUserQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<User> =>
  useFindQuery<User>({ ...props, route: 'user' });
