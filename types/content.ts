import type { IProfileUser } from './user';

export enum EContentType {
  POST = 'POST',
  MEETUP = 'MEETUP',
  PODCAST = 'PODCAST',
}

export enum EQueryContentType {
  POST = 'post',
  MEETUP = 'meetup',
  PODCAST = 'podcast',
  GROUP = 'group',
}

export interface IContent {
  group: {
    id: string;
    bio: string;
    name: string;
    coverImage: string;
  };
  content: IContent;
  id: string;
  type?: EContentType;
  createdAt: Date;
  updatedAt: Date;
  author: IProfileUser;
  authorId: string;
  likedBy: IProfileUser[];
  likes: ILike[] | undefined;
  title: string;
  description: string;
  postGroups: string[];
  coverImage: string | null;
  meetupLocation: string | null;
  meetupDate: Date | null;
  podcastFile: string | null;
  podcastTitle: string | null;
  tags: [
    {
      id: string;
      title: string;
    },
  ];
  comments: Comment[];
  contentGroups: [];
  viewsCount: number | null;
  likesCount: number | null;
  commentsCount: number | null;
  groupId: string | null;
  isLiked: boolean;
}

interface ILike {
  user: IProfileUser;
  userId: string;
  content: IContent;
  contentId: string;
}
