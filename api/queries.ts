import { EQueryContentType, IContent } from '@/types/content';

// ----------------------------------------------------------------

const BASE_API_URL = 'http://localhost:8080/api';

export const fetchUserContent = async (
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

export const fetchUserGroups = async (userId: string, page: number) => {
  const response = await fetch(
    BASE_API_URL + `/user/${userId}/groups?page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

export const fetchAllGroups = async (page: number) => {
  const response = await fetch(BASE_API_URL + `/groups?page=${page}`);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};
