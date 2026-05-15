import type { UseQueryResult } from '@tanstack/react-query';
import type { FindYoloQuery } from 'domain/models';
import { useFindQuery } from '../default-query';

export const useFindMeQuery = (): UseQueryResult<FindYoloQuery> =>
  useFindQuery<FindYoloQuery>({ route: 'user', id: 'me' });
