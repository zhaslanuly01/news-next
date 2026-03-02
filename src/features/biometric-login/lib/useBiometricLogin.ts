"use client";

import type { AppDispatch } from "@/app/providers/store";
import {
  sessionStorageService,
  setAuthenticated,
  setSessionInitialized,
} from "@/entities/session";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useBiometricLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        dispatch(setAuthenticated(true));
        await sessionStorageService.saveAuth(true);
      } catch (e) {
        setError("Не удалось инициализировать сессию");
      } finally {
        dispatch(setSessionInitialized(true));
        setLoading(false);
      }
    };

    run();
  }, [dispatch]);

  const loginWithBiometrics = async () => {
    setLoading(true);
    setError(null);

    try {
      dispatch(setAuthenticated(true));
      await sessionStorageService.saveAuth(true);
      return true;
    } catch {
      setError("Не удалось выполнить вход");
      return false;
    } finally {
      dispatch(setSessionInitialized(true));
      setLoading(false);
    }
  };

  const loginWithoutBiometricsForDemo = async () => {
    dispatch(setAuthenticated(true));
    await sessionStorageService.saveAuth(true);
    dispatch(setSessionInitialized(true));
  };

  return {
    loading,
    error,
    loginWithBiometrics,
    loginWithoutBiometricsForDemo,
  };
}
