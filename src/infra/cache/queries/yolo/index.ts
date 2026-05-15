import type { UseQueryResult } from '@tanstack/react-query';
import type { FindYoloQuery, Yolo } from 'domain/models';
import { useFindQuery, type useFindQueryProps } from '../default-query';

export const useFindYoloQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindYoloQuery> =>
  useFindQuery<FindYoloQuery>({ ...props, route: 'yolo' });

export const useFindOneYoloQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Yolo> =>
  useFindQuery<Yolo>({ ...props, route: 'yolo' });
