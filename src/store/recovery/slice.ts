import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface RecoveryState {
  email: string | null;
  code: string | null;
}

const initialState: RecoveryState = {
  email: null,
  code: null
};

const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    setRecoveryData(state, action: PayloadAction<{ email?: string | null; code?: string | null }>) {
      if (action.payload.email !== undefined) state.email = action.payload.email;
      if (action.payload.code !== undefined) state.code = action.payload.code;
    },
    clearEmailRecovery(state) {
      state.email = null;
    },
    clearCodeRecovery(state) {
      state.code = null;
    }
  }
});

export const {
  reducer: recoveryReducer,
  actions: { setRecoveryData, clearEmailRecovery, clearCodeRecovery }
} = recoverySlice as typeof recoverySlice & {
  actions: {
    setRecoveryData: (payload: {
      email?: string | null;
      code?: string | null;
    }) => PayloadAction<{ email?: string | null; code?: string | null }>;
    clearEmailRecovery: () => PayloadAction<void>;
    clearCodeRecovery: () => PayloadAction<void>;
  };
};
export default recoveryReducer;
