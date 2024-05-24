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
  updatedAt: Date;
  author: IProfileUser;
  authorId: string;
  likedBy: IProfileUser[];
  likes: ILike[] | undefined;
  title: string;
  contentDescription: string;
  postGroups: string[];
  coverImage: string | null;
  meetupLocationImage: string | null;
  meetupDate: Date | null;
  podcastAudioFile: string | null;
  podcastAudiTitle: string | null;
  storyTags: string[];
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
