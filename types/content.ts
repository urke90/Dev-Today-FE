import type { IProfileUser } from './user';

export enum EContentType {
  POST = 'POST',
  MEETUP = 'MEETUP',
  PODCAST = 'PODCAST',
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
  author: {
    name: string;
    avatarImg: string;
  };
  // author: IProfileUser;
  authorId: string;
  likedBy: IProfileUser[];
  likes: ILike[] | undefined;
  title: string;
  description: string;
  postGroups: string[];
  coverImage: string | null;
  meetupLocationImage?: string | null;
  meetupLocation?: string | null;
  meetupDate: Date | null;
  podcastFile?: string | null;
  podcastTitle?: string | null;
  tags: ITag[];
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

export interface ITag {
  id: string;
  title: string;
}
