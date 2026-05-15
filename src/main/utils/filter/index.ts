import { store } from 'store';
import { updateFilter } from 'store/filters/slice';
import type { FilterDataProps, FilterSliceState, TableSortFilter } from 'store/filters/slice';

export const setFilter = <T extends keyof FilterSliceState>(
  entity: T,
  data: Partial<FilterDataProps<T>>
): void => {
  const values = store.getState().filter[entity];
  const { page } = values;

  if (page && page !== 1 && !data.page) Object.assign(data, { page: 1 });

  store.dispatch(updateFilter({ data, entity }));
};

export const setSortFilter = <T extends keyof FilterSliceState>(
  entity: T,
  field: keyof FilterDataProps<T>
): TableSortFilter => {
  const values = store.getState().filter[entity];

  return {
    onChangeSort(sort): void {
      setFilter(entity, { sort, sortBy: sort ? field : null } as Partial<FilterDataProps<T>>);
    },
    sort: values?.sort || null,
    sortBy: values?.sortBy || null
  };
};
