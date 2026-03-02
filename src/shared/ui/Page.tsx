import * as React from "react";
import { cn } from "../lib/utils/utils";

type PageProps = React.PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  withTopPadding?: boolean;
}>;

export function Page({
  children,
  className,
  contentClassName,
  withTopPadding = true,
}: PageProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-white",
        "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      <div
        className={cn(
          "min-h-screen",
          withTopPadding && "pt-2",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
