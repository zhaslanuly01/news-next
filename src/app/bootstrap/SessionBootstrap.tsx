"use client";

import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../providers/store";
import {
  sessionStorageService,
  setAuthenticated,
  setBiometricsEnabled,
  setSessionInitialized,
} from "@/entities/session";

export function SessionBootstrap({ children }: PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [auth, biometricsEnabled] = await Promise.all([
          sessionStorageService.getAuth(),
          sessionStorageService.getBiometricsEnabled(),
        ]);

        if (!mounted) return;

        dispatch(setAuthenticated(auth));
        dispatch(setBiometricsEnabled(biometricsEnabled));
      } finally {
        if (mounted) dispatch(setSessionInitialized(true));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return <>{children}</>;
}
