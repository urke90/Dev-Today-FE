'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------

interface IQueryProviderProps {
  children: React.ReactNode;
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const QueryProvider: React.FC<IQueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
