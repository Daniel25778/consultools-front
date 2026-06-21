import type { DashboardContentMap, FindDashboardQuery } from '../dashboard';

export type ChartProps<T extends keyof DashboardContentMap> = {
  data: FindDashboardQuery<T>;
};
