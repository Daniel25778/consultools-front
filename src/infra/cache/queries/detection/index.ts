import type { UseQueryResult } from '@tanstack/react-query';
import type { Detection, FindDetectionQuery } from 'domain/models';
import { useFindQuery, type useFindQueryProps } from '../default-query';

export const useFindDetectionQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindDetectionQuery> =>
  useFindQuery<FindDetectionQuery>({ ...props, route: 'detection' });

export const useFindOneDetectionQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Detection> =>
  useFindQuery<Detection>({ ...props, route: 'detection' });
