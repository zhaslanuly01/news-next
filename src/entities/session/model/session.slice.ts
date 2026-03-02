import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionState = {
  isAuthenticated: boolean;
  biometricsEnabled: boolean;
  initialized: boolean;
};

const initialState: SessionState = {
  isAuthenticated: false,
  biometricsEnabled: true,
  initialized: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setBiometricsEnabled(state, action: PayloadAction<boolean>) {
      state.biometricsEnabled = action.payload;
    },
    setSessionInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    logoutSession(state) {
      state.isAuthenticated = false;
    },
  },
});

export const {
  setAuthenticated,
  setBiometricsEnabled,
  setSessionInitialized,
  logoutSession,
} = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;

export type SessionSchema = {
  session: SessionState;
};
