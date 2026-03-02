import { AuthGuard } from "@/app";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
