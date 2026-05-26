import type { UseQueryResult } from '@tanstack/react-query';
import type { FindProductionReportQuery, ProductionReportDetails } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';
import { useFindQuery } from 'infra/cache/queries/default-query';

export const useFindProductionReportQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<FindProductionReportQuery> =>
  useFindQuery<FindProductionReportQuery>({ ...props, route: 'productionReport' });

export const useFindOneProductionReportQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<ProductionReportDetails> =>
  useFindQuery<ProductionReportDetails>({ ...props, route: 'productionReport' });
