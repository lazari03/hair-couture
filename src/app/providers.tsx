"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartProvider } from "@/lib/cart/cart-context";
import { AnalyticsProvider } from "@/app/AnalyticsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AnalyticsProvider />
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
}
