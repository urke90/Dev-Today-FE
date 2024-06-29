import { EContentType } from './content';

export interface IGroup {
  id: string;
  name: string;
  type: EContentType;
  coverImage: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    members: number;
  };
  members: {
    id: string;
    avatarImg?: string;
  }[];
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

export interface IGroupUpdate {
  id: string;
  name: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}
