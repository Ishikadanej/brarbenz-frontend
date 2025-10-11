"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryClientProvideLayout = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60000 * 3 } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default QueryClientProvideLayout;
