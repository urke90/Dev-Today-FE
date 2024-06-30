import { EContentType, IContent } from './content';
import { EUserRole } from './user';

export enum EGroupContentTypes {
  POST = 'post',
  MEETUP = 'meetup',
  PODCAST = 'podcast',
  MEMBERS = 'members',
}

export interface IGroup {
  id: string;
  name: string;
  // type: EContentType;
  coverImage: string;
  profileImage: string;
  contents: IContent[];
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

export interface IGroupWithCount extends IGroup {
  _count: {
    [key: string]: number;
  };
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

export interface IHomePageGroupsResponse {
  groups: IGroupsHomePageGroup[];
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IProfilePageGroupsResponse {
  groups: IProfilePageGroup[];
  hasNextPage: boolean;
  totalPages: number;
}

export interface IGroupDetailsResponse {
  group: IDetailsPageGroup;
  topRankedGroups?: IGroupWithCount[];
  isGroupOwner: boolean;
  isGroupAdmin: boolean;
  isGroupUser: boolean;
}

export interface IDetailsPageGroup extends IGroup {
  members: {
    id: string;
    role: EUserRole;
    userName: string;
    avatarImg: string | null;
  }[];
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

export interface IGroupContentResponse {
  contents: IContent[];
  totalPages: number;
  hasNextPage: boolean;
}
export interface IGroupMembersResponse {
  members: IGroupMember[];
  totalPages: number;
  hasNextPage: boolean;
}

export interface IGroupMember {
  role: EUserRole;
  id: string;
  avatarImg: string;
  userName: string;
}

export interface ISelectGroup {
  groups: {
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
  }[];
}
export interface ITags {
  id: string;
  title: string;
}

export interface IGlobalSearchItem {
  id: string;
  title: string;
  type: EContentType | null;
}
export interface IGroupUpdate {
  id: string;
  name: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}
