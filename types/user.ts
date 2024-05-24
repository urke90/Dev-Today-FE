import { EContentType } from './content';

export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IProfileUser {
  id: string;
  userName: string;
  name: string;
  email: string;
  currentKnowledge: string;
  codingAmbitions: string[];
  isOnboardingCompleted: boolean;
  preferredSkills: string[];
  bio: string | null;
  avatarImg: string;
  createdAt: string | Date;
  instagramName: string | null;
  instagramLink: string | null;
  linkedinName: string | null;
  linkedinLink: string | null;
  twitterName: string | null;
  twitterLink: string | null;
  role: EUserRole;
  followers: string[];
  following: string[];
  contents: IUserRecentContent[];
}

export interface IUserRecentContent {
  id: string;
  title: string;
  contentDescription: string;
  coverImage: string | null;
  meetupDate: Date | null;
  tags: string[];
  type: EContentType;
}

export interface IProfileUserResponse {
  user: IProfileUser;
  isFollowing: boolean;
}
