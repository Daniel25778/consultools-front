import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  collaboratorFilterInitialState,
  companyFilterInitialState,
  wasteTypeFilterInitialState,
  type CollaboratorFilter,
  type CompanyFilter,
  type WasteTypeFilter
} from 'domain/models';
import { userFilterInitialState, type UserFilter } from 'domain/models/user';
import type { Sort } from 'domain/protocol';

export interface TableSortFilter {
  onChangeSort: (sort: Sort) => void;
  sortBy: string | null;
  sort: Sort;
}

export interface FilterSliceState {
  user: UserFilter;
  company: CompanyFilter;
  collaborator: CollaboratorFilter;
  wasteType: WasteTypeFilter;
}

const initialState: FilterSliceState = {
  user: userFilterInitialState,
  collaborator: collaboratorFilterInitialState,
  wasteType: wasteTypeFilterInitialState,
  company: companyFilterInitialState
};

export type FilterDataProps<T extends keyof FilterSliceState> = FilterSliceState[T];

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    resetFilter<T extends keyof FilterSliceState>(
      state: FilterSliceState,
      action: PayloadAction<T>
    ) {
      state[action.payload] = initialState[action.payload];
    },
    resetFilterNoPagination<T extends keyof FilterSliceState>(
      state: FilterSliceState,
      action: PayloadAction<T>
    ) {
      state[action.payload] = {
        ...initialState[action.payload],
        page: state[action.payload]
      };
    },
    updateFilter<T extends keyof FilterSliceState>(
      state: FilterSliceState,
      action: PayloadAction<{ entity: T; data: Partial<FilterDataProps<T>> }>
    ) {
      const { data, entity } = action.payload;

      const newData = { ...state[entity] };

      Object.entries(data).forEach(([key, value]) => {
        const formattedKey = key as keyof FilterDataProps<T>;

        if (data[formattedKey] !== undefined) Object.assign(newData, { [key]: value });
      });

      state[entity] = newData;
    }
  }
});

export const {
  reducer: filterReducer,
  actions: { resetFilter, updateFilter, resetFilterNoPagination }
} = filterSlice;
