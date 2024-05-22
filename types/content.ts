import type { IProfileUser } from './user';

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

export interface IContent {
  id: string;
  type?: EContentType;
  createdAt: Date;
  updatedAt?: Date;
  author: IProfileUser;
  authorId: string;
  likedBy: IProfileUser[];
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
  user: IProfileUser;
  userId: string;
  content: IContent;
  contentId: string;
}
