import { EQueryContentType, IContent } from '@/types/content';

// ----------------------------------------------------------------

const BASE_API_URL = 'http://localhost:8080/api';

export const fetchContent = async (
  userId: string,
  contentType: EQueryContentType,
  page: number
): Promise<{ content: IContent[] }> => {
  const response = await fetch(
    BASE_API_URL + `/user/${userId}/content?type=${contentType}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  console.log('response u FETCH CONTENT', await response.json());

  return response.json();
};

export const fetchGroups = async (userId: string, page: number) => {
  const response = await fetch(
    BASE_API_URL + `/user/${userId}/groups&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};
