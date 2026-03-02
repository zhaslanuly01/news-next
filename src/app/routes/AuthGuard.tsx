"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectSessionInitialized,
} from "@/entities/session";

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const initialized = useSelector(selectSessionInitialized);

  useEffect(() => {
    if (!initialized) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [initialized, isAuthenticated, router]);

  if (!initialized) {
    return <div className="p-4">PAGE_LOADING...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
