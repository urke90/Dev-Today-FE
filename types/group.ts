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

export interface IAllGroupsResponse {
  groups: IGroup[];
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
