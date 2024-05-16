'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
