import { EContentType, IContent } from './content';
import { EUserRole } from './user';

export enum EGroupContentTyps {
  POST = 'post',
  MEETUP = 'meetup',
  PODCAST = 'podcast',
  MEMBERS = 'members',
}

export interface IGroup {
  id: string;
  name: string;
  type: EContentType;
  coverImage: string;
  profileImage: string;
  authorId: string;
  bio: string;
  createdAt: string | null;
  updatedAt: string | null;
  // TODO: ostaviti grupu cistu datu bez nestovanih tabela i posle samo extend Interfaces ili Types
  // _count: {
  //   members?: number;
  //   contents?: number;
  // };
  // members: {
  //   id: string;
  //   avatarImg?: string;
  // }[];
}

export interface IProfilePageGroup extends IGroup {
  _count: {
    members: number;
  };
  members: {
    id?: string;
    avatarImg: string | null;
  }[];
}

export interface IGroupsHomePageGroup extends IGroup {
  members: {
    user: {
      avatarImg: string | null;
    };
  }[];
  _count: {
    members: number;
  };
}

export interface IHomeGroupsResponse {
  groups: IGroupsHomePageGroup[];
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IGroupDetailsResponse {
  group: IDetailsPageGroup;
  topRankedGroups?: IGroup[];
}

export interface IDetailsPageGroup extends IGroup {
  members: {
    user?: { avatarImg: string | null; userName: string };
    role?: EUserRole;
  };
  author: {
    userName: string;
  };
  _count: { contents: number; members: number };
}

export interface IAllGroupsSidebarDetails {
  topRankedGroups: IDetailsPageGroup[];
  topActiveGroups: IDetailsPageGroup[];
  meetups: IContent[]; //  1. Pick -> 2. Omit
  podcasts: IContent[];
  posts: IContent[];
}

export interface ISelectGroup {
  id: string;
  profileImage: string;
  bio: string;
  name: string;
  coverImg: string;
  updatedAt: Date;
  _count: {
    members: number;
  };
  members: {
    id: string;
    avatarImg?: string | undefined;
  };
}

export interface ITags {
  id: string;
  title: string;
}
