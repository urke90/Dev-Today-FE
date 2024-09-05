import type {
  IBaseGroupSchema,
  IPutMeetupDTO,
  IPutPodcastDTO,
  IPutPostDTO,
  IUpdateGroupSchema,
} from '@/lib/validation';
import { EUserRole } from '@/types/user';

// ----------------------------------------------------------------

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const createGroup = async (
  data: IBaseGroupSchema,
  members: { userId: string; role: EUserRole }[]
) => {
  const response = await fetch(BASE_API_URL + '/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, members }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const updateGroup = async (id: string, data: IUpdateGroupSchema) => {
  const response = await fetch(BASE_API_URL + `/groups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

export const createPost = async (data: IPutPostDTO) => {
  const response = await fetch(BASE_API_URL + '/content/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const updatePost = async (
  postId: string | undefined,
  data: IPutPostDTO,
  viewerId: string | undefined
) => {
  const response = await fetch(
    BASE_API_URL + `/content/post/${postId}?viewerId=${viewerId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const createMeetup = async (data: IPutMeetupDTO) => {
  const response = await fetch(BASE_API_URL + '/content/meetup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const updateMeetup = async (
  postId: string | undefined,
  data: IPutMeetupDTO,
  viewerId: string | undefined
) => {
  const response = await fetch(
    BASE_API_URL + `/content/meetup/${postId}?viewerId=${viewerId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const createPodcast = async (data: IPutPodcastDTO) => {
  const response = await fetch(BASE_API_URL + '/content/podcast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const updatePodcast = async (
  postId: string | undefined,
  data: IPutPodcastDTO,
  viewerId: string | undefined
) => {
  const response = await fetch(
    BASE_API_URL + `/content/podcast/${postId}?viewerId=${viewerId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const joinGroup = async (groupId: string, userId: string) => {
  const response = await fetch(BASE_API_URL + `/groups/${groupId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      viewerId: userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const leaveGroup = async (groupId: string, userId: string) => {
  const response = await fetch(BASE_API_URL + `/groups/${groupId}/leave`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      viewerId: userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const removeMemberFromGroup = async (
  groupId: string,
  viewerId: string,
  userId: string
) => {
  const response = await fetch(BASE_API_URL + `/groups/${groupId}/user`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      viewerId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const assignAdminRole = async (
  groupId: string,
  viewerId: string,
  userId: string
) => {
  const response = await fetch(BASE_API_URL + `/groups/${groupId}/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      viewerId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};

export const removeAdminRole = async (
  groupId: string,
  viewerId: string,
  userId: string
) => {
  const response = await fetch(BASE_API_URL + `/groups/${groupId}/admin`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      viewerId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  return response.json();
};
