import { useQuery } from '@tanstack/react-query';

// ----------------------------------------------------------------

export const useTypedQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['QUERY_KEY'],
    queryFn: () => {},
  });
};
