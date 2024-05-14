import type { IUser } from './user';

export enum EContentType {
  POSTS = 'posts',
  MEETUPS = 'meetups',
  PODCASTS = 'podcasts',
}

export enum EQueryContentType {
  POSTS = 'posts',
  MEETUPS = 'meetups',
  PODCASTS = 'podcasts',
  GROUPS = 'groups',
}

interface IContent {
  id: string;
  type?: EContentType; // You need to define this enum based on your valid content types
  createdAt: Date;
  updatedAt?: Date;
  author: IUser;
  authorId: string;
  likedBy: IUser[];
  likes: ILike[];
  title?: string;
  contentDescription?: string;
  postGroups: string[];
  coverImage?: string;
  meetUpLocationImage?: string;
  meetUpDate?: Date;
  podcastAudioFile?: string;
  podcastAudiTitle?: string;
  storyTags: string[];
  comments: Comment[];
  contentGroups: [];
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
}

interface ILike {
  user: IUser;
  userId: string;
  content: IContent;
  contentId: string;
}
