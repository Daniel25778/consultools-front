import type { Nature } from 'domain/enums';

export type DashboardContentMap = {
  'stopped-vs-productive': {
    stopped_hours: string;
    productive_hours: string;
  };

  'pareto-stoppings-by-reason': {
    id: string;
    name: string;
    stoppedSeconds: string;
  };

  'stoppings-by-responsible-area': {
    id: string;
    name: string;
    stoppedSeconds: string;
  };

  'stoppings-by-nature': {
    nature: Nature;
    stoppedSeconds: string;
  };

  'top-stopping-products': {
    id: string;
    name: string;
    stoppedSeconds: string;
  };

  'waste-by-type': {
    id: string;
    name: string;
    quantity: string;
  };

  'waste-rate': {
    production: string;
    waste: string;
    wasteRate: string;
  };

  'waste-rate-by-product': {
    id: string;
    name: string;
    production: string;
    waste: string;
    wasteRate: string;
  };

  'waste-evolution-daily': {
    day: string;
    waste: string;
  };

  'waste-evolution-weekly': {
    week: string;
    waste: string;
  };

  'waste-evolution-monthly': {
    month: string;
    waste: string;
  };

  'top-waste-products': {
    id: string;
    name: string;
    waste: string;
  };
};

export type FindDashboardQuery<T extends keyof DashboardContentMap> = {
  content: DashboardContentMap[T][];
  type: T;
};

export interface FindDashboardTypesQuery {
  content: {
    value: keyof DashboardContentMap;
    label: string;
  }[];
}
