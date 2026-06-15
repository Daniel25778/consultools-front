import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from 'domain/models';

interface PersistState {
  user: User;
  accessToken: string | null;
  isLoading: boolean;
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  redirectPath: string | null;
}

const initialState: PersistState = {
  accessToken: null,
  isLoading: false,
  redirectPath: null,
  theme: 'light',
  sidebarOpen: false,
  user: null as unknown as User
};

const persistSlice = createSlice({
  initialState,
  name: 'persist',
  reducers: {
    logout(state: PersistState) {
      state.user = null as unknown as User;
      state.accessToken = null;
    },
    setAuth(state: PersistState, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
    },
    setSidebarOpen(state: PersistState, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setIsLoading(state: PersistState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setRedirectPath(state: PersistState, action: PayloadAction<string | null>) {
      state.redirectPath = action.payload;
    },
    setTheme(state: PersistState, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
    setUser(state: PersistState, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});

export const {
  reducer: persistReducer,
  actions: { logout, setUser, setTheme, setIsLoading, setRedirectPath, setSidebarOpen, setAuth }
} = persistSlice;
