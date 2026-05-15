import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { filterReducer } from './filters/slice';
import { persistReducer as persistedReducer } from './persist/slice';
import { sidebarReducer } from './sidebar/slice';
import { themeReducer } from './theme/slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persisted = persistReducer(persistConfig, persistedReducer);

const rootReducer = combineReducers({
  theme: themeReducer,
  filter: filterReducer,
  persist: persisted,
  sidebar: sidebarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
