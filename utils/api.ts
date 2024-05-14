const BASE_API_URL = 'http://localhost:8080/api';

export const typedFetch = async <T extends object>(
  url: string,
  method: string = 'GET',
  headers?: HeadersInit,
  body?: object
): Promise<T> => {
  const response = await fetch(BASE_API_URL + url, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });

  if (!response.ok)
    throw new Error('Fetch failed for URL:' + BASE_API_URL + url);

  return (await response.json()) as T;
};
