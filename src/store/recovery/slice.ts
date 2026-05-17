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
    clearRecovery(state) {
      state.email = null;
      state.code = null;
    }
  }
});

export const {
  reducer: recoveryReducer,
  actions: { setRecoveryData, clearRecovery }
} = recoverySlice as typeof recoverySlice & {
  actions: {
    setRecoveryData: (payload: {
      email?: string | null;
      code?: string | null;
    }) => PayloadAction<{ email?: string | null; code?: string | null }>;
    clearRecovery: () => PayloadAction<void>;
  };
};
export default recoveryReducer;
