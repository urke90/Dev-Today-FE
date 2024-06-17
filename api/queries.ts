import type { IContent } from '@/types/content';
import { EQueryType } from '@/types/queries';

// ----------------------------------------------------------------

const BASE_API_URL = 'http://localhost:8080/api';

export const fetchUserContent = async (
  userId: string,
  contentType: EQueryType,
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

export const fetchGroupContent = async (page: number, type: EQueryType) => {
  const response = await fetch(
    BASE_API_URL + `/groups?page=${page}&type=${type}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};
