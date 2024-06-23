import {
  IPost,
  createGroupSchema,
  postSchema,
  updateGroupSchema,
} from '@/lib/validation';
import { EUserRole } from '@/types/user';
import { z } from 'zod';

// ----------------------------------------------------------------
const BASE_API_URL = 'http://localhost:8080/api';

export const createGroup = async (
  data: z.infer<typeof createGroupSchema>,
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

export const updateGroup = async (
  id: string,
  data: z.infer<typeof updateGroupSchema>
) => {
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

export const createContent = async (data: IPost) => {
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

export const updateContent = async (id: string, data: IPost) => {
  const response = await fetch(BASE_API_URL + `/content/post/${id}`, {
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

export const createMeetupContent = async (data: z.infer<typeof postSchema>) => {
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

export const updateMeetupContent = async (
  id: string,
  data: z.infer<typeof postSchema>
) => {
  const response = await fetch(BASE_API_URL + `/content/meetup/${id}`, {
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

export const createPodcastContent = async (
  data: z.infer<typeof postSchema>
) => {
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

export const updatePodcastContent = async (
  id: string,
  data: z.infer<typeof postSchema>
) => {
  const response = await fetch(BASE_API_URL + `/content/podcast/${id}`, {
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
``;
