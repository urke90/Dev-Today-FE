export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

interface IUser {
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
}

const userResult = {
  user: {
    role: 'USER',
    followers: [],
    following: [],
  },
  latestContent: [
    { createdAt: '2024-05-08T21:41:20.477Z' },
    { createdAt: '2024-05-08T21:40:27.702Z' },
    { createdAt: '2024-05-08T21:39:33.834Z' },
  ],
  isFollowing: false,
};
