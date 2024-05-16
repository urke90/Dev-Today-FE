import { EQueryContentType } from '@/types/content';

// ----------------------------------------------------------------

const BASE_API_URL = 'http://localhost:8080/api';

export const fetchContent = async (
  userId: string,
  contentType: EQueryContentType,
  page: number
) => {
  const response = await fetch(
    `/user/${userId}/content?type=${contentType}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

export const fetchGroups = async (userId: string, page: number) => {
  const response = await fetch(`/user/${userId}/groups&page=${page}`);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};
