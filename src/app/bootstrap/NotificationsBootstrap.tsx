"use client";

import { requestNotificationsPermission } from "@/shared/lib/notifications";
import { PropsWithChildren, useEffect } from "react";

export function NotificationsBootstrap({ children }: PropsWithChildren) {
  useEffect(() => {
    let isMounted = true;

    const initNotifications = async () => {
      await requestNotificationsPermission();
    };

    initNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{children}</>;
}
