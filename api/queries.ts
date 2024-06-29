import type { IContent } from '@/types/content';
import { EQueryType } from '@/types/queries';
import { EUserRole } from '@/types/user';

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
  type: EQueryType,
  viewerId: string
) => {
  const response = await fetch(
    BASE_API_URL +
      `/groups/${id}/content?type=${type}&page=${page}&viewerId=${viewerId}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const fetchGroupMembers = async (
  id: string,
  page: number,
  role?: EUserRole
) => {
  const roleQuery = role ? `&role=${role.toLowerCase()}` : '';
  console.log('roleQuery', roleQuery);
  const response = await fetch(
    BASE_API_URL + `/groups/${id}/members?page=${page}&limit=5${roleQuery}`
  );

  console.log('response FETCH GROUP MEMBERS', response);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const fetchGroupsAndContents = async (q: string, limit: number = 3) => {
  const response = await fetch(BASE_API_URL + `/search?q=${q}`);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};
