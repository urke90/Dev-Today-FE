import { EQueryContentType, IContent } from '@/types/content';

// ----------------------------------------------------------------

const BASE_API_URL = 'http://localhost:8080/api';

export const fetchContent = async (
  userId: string,
  contentType: EQueryContentType,
  page: number,
  viewerId: string
): Promise<IContent[]> => {
  const response = await fetch(
    BASE_API_URL +
      `/user/${userId}/content?type=${contentType}&page=${page}&viewerId=${viewerId}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

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

export const fetchUsers = async (query: string) => {
  const response = await fetch(BASE_API_URL + `/user?q=${query}&limit=5`);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const fetchCreateGroups = async (query: string) => {
  const result = await fetch(BASE_API_URL + `/groups?q=${query}`);

  if (!result.ok) {
    throw new Error('Something went wrong!');
  }

  return result.json();
};

export const fetchTags = async (query: string) => {
  const result = await fetch(BASE_API_URL + `/content/tags?title=${query}`);

  if (!result.ok) {
    throw new Error('Something went wrong!');
  }

  return result.json();
};
