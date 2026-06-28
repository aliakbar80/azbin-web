"use client";

import { type ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { Providers } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { UIProvider } from "./UIProvider";
const Loader = dynamic(() => import("@/components/landing/Loader"), { ssr: false });

export function AllProviders({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <Providers>
      <ThemeProvider>
        {loading && <Loader onComplete={() => setLoading(false)} />}
        <UIProvider>
          <AuthProvider>{children}</AuthProvider>
        </UIProvider>
      </ThemeProvider>
    </Providers>
  );
}
