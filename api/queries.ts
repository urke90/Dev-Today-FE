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
  const response = await fetch(
    BASE_API_URL + `/groups?members=true&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const fetchGroupContent = async (
  id: string,
  page: number,
  type: EQueryType
) => {
  const response = await fetch(
    BASE_API_URL + `/groups/${id}/content?type=${type}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const fetchGroupMembers = async (id: string, page: number) => {
  const response = await fetch(
    BASE_API_URL + `/groups/${id}/members?page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};
