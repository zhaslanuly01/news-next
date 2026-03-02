const KEYS = {
  AUTH: "session_isAuthenticated",
  BIOMETRICS_ENABLED: "session_biometricsEnabled",
};

function isBrowser() {
  return typeof window !== "undefined";
}

export const sessionStorageService = {
  async saveAuth(value: boolean) {
    if (!isBrowser()) return;
    window.localStorage.setItem(KEYS.AUTH, String(value));
  },

  async getAuth() {
    if (!isBrowser()) return false;
    return window.localStorage.getItem(KEYS.AUTH) === "true";
  },

  async saveBiometricsEnabled(value: boolean) {
    if (!isBrowser()) return;
    window.localStorage.setItem(KEYS.BIOMETRICS_ENABLED, String(value));
  },

  async getBiometricsEnabled() {
    if (!isBrowser()) return true;
    const value = window.localStorage.getItem(KEYS.BIOMETRICS_ENABLED);
    if (value == null) return true;
    return value === "true";
  },

  async clearSession() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(KEYS.AUTH);
    window.localStorage.removeItem(KEYS.BIOMETRICS_ENABLED);
  },
};
