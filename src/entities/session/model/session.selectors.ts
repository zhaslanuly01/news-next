import { SessionSchema } from "./session.slice";

export const selectIsAuthenticated = (state: SessionSchema) =>
  state.session.isAuthenticated;

export const selectBiometricsEnabled = (state: SessionSchema) =>
  state.session.biometricsEnabled;

export const selectSessionInitialized = (state: SessionSchema) =>
  state.session.initialized;
