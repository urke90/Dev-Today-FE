import {
  IPutMeetupDTO,
  IPutPodcastDTO,
  IPutPostDTO,
  createGroupSchema,
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

export const createContent = async (data: IPutPostDTO) => {
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

export const updateContent = async (
  postId: string,
  data: IPutPostDTO,
  viewerId: string
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

export const createMeetupContent = async (data: IPutMeetupDTO) => {
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
  postId: string,
  data: IPutMeetupDTO,
  viewerId: string
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

export const createPodcastContent = async (data: IPutPodcastDTO) => {
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
  postId: string,
  data: IPutPodcastDTO,
  viewerId: string
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
``;
