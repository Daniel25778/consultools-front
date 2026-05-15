import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  theme: 'dark' | 'light';
}

const initialState: ThemeState = {
  theme: 'light',
};

const ThemeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    setTheme(state: ThemeState, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
  },
});

export default ThemeSlice.reducer;

export const {
  reducer: themeReducer,
  actions: { setTheme },
} = ThemeSlice;
