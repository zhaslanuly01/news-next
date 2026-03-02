"use client";

import { PropsWithChildren } from "react";
import { NotificationsBootstrap } from "../bootstrap/NotificationsBootstrap";
import { SessionBootstrap } from "../bootstrap/SessionBootstrap";
import { StoreProvider } from "./StoreProvider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <SessionBootstrap>
        <NotificationsBootstrap>{children}</NotificationsBootstrap>
      </SessionBootstrap>
    </StoreProvider>
  );
}
