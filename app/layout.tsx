import type { FC, PropsWithChildren } from "react";

import "@/shared/styles/global.css";
import { AppProvider } from "@/app";
import { Toaster } from "react-hot-toast";

type RootLayoutProps = PropsWithChildren;

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
};

export default RootLayout;
