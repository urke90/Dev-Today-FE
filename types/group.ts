import { EContentType } from './content';

export interface IGroup {
  id: string;
  name: string;
  type: EContentType;
  coverImg: string;
  groupBio: string;
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
  tags: {
    id: string;
    title: string;
  }[];
}
