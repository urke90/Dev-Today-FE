import type { IProfilePageContentResponse } from '@/types/content';
import { IProfilePageGroupsResponse } from '@/types/group';
import { EQueryType, ESortByFilter } from '@/types/queries';
import { EUserRole } from '@/types/user';

// ----------------------------------------------------------------

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const fetchUserContent = async (
  userId: string,
  contentType: EQueryType,
  page: number,
  viewerId: string
): Promise<IProfilePageContentResponse> => {
  const response = await fetch(
    BASE_API_URL +
      `/user/${userId}/content?type=${contentType}&page=${page}&viewerId=${viewerId}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const fetchUserGroups = async (
  userId: string,
  page: number
): Promise<IProfilePageGroupsResponse> => {
  const response = await fetch(
    BASE_API_URL + `/user/${userId}/groups?page=${page}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

export const fetchAllGroups = async (
  page: number,
  viewerId: string,
  sortBy: ESortByFilter
) => {
  const sortQuery = sortBy ? `&sortBy=${sortBy}` : '';

  const response = await fetch(
    BASE_API_URL +
      `/groups?members=true&page=${page}&viewerId=${viewerId}${sortQuery}`
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

  const response = await fetch(
    BASE_API_URL + `/groups/${id}/members?page=${page}&limit=5${roleQuery}`
  );

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

export const fetchAllContents = async (
  contentType: EQueryType,
  page: number,
  viewerId: string,
  limit: number,
  sortBy?: ESortByFilter,
  selectedTag?: string
) => {
  const sortByQuery = sortBy ? `&sortBy${sortBy}` : '';

  const response = await fetch(
    BASE_API_URL +
      `/content?type=${contentType}&page=${page}&limit=${limit}&viewerId=${viewerId}&tag=${selectedTag}${sortByQuery}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};
