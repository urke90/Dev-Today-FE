const BASE_API_URL = 'http://localhost:8080/api';

interface IFetchRequest {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  headers?: HeadersInit;
  body?: object;
  cache?: RequestCache;
}

export const typedFetch = async <T extends object>({
  url,
  method = 'GET',
  headers,
  body,
  cache,
}: IFetchRequest): Promise<T> => {
  const response = await fetch(BASE_API_URL + url, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
    cache,
  });

  if (!response.ok)
    throw new Error('Fetch failed for URL:' + BASE_API_URL + url);

  return (await response.json()) as T;
};
