import type { IProfileUser } from './user';

export enum EContentType {
  POST = 'post',
  MEETUP = 'meetup',
  PODCAST = 'podcast',
}

export enum EQueryContentType {
  POST = 'post',
  MEETUP = 'meetup',
  PODCAST = 'podcast',
  GROUP = 'group',
}

export interface IContent {
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
  meetupLocationImage: string | null;
  meetupDate: Date | null;
  podcastFile: string | null;
  podcastTitle: string | null;
  tags: string[];
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