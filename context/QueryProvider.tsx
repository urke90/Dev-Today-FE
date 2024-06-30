'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------

interface IQueryProviderProps {
  children: React.ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const QueryProvider: React.FC<IQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
