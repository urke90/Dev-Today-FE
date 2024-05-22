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
  contents: IRecentContent[];
}

export interface IRecentContent {
  id: string;
  title: string;
  contentDescription: string;
  coverImage: string | null;
}

export interface IUserResponse {
  user: IProfileUser;
  contents: IRecentContent[];
  isFollowing: boolean;
}

// userResult [
//   {
//     id: 'c196091c-79cb-4c79-9f18-2bf6192ab8fc',
//     title: 'Infinite Loops and Epic Code Tales',
//     contentDesrition: 'Embark on a coding adventure with Alex Devlin, where each episode unfolds epic code tales and explores the intricacies of infinite loops. From debugging nightmares to triumphs in optimization, this podcast is your ticket to the world of coding sagas.',
//     coverImage: null
//   },
//   {
//     id: '802bac24-e28c-48ba-9773-2a47f29b5608',
//     title: "API Architects Unplugged: Building the Web's Backbone with Emma Architecta",
//     contentDesrition: 'Emma Architecta unplugs the intricacies of API architecture, discussing the backbone of the web, RESTful design, and the evolution of APIs. Tune in to architect a robust foundation for your web development projects.',
//     coverImage: null
//   },
//   {
//     id: '8a83c71a-94fb-4b87-a57d-80c746726e65',
//     title: 'The DevOps Navigator: Charting the Course with Maria Engineer',
//     contentDesrition: 'She navigates the seas of DevOps, exploring best practices, tools, and success stories. This podcast is your compass for steering through the complexities of development and operations integration. Set sail for a smoother DevOps journey! 🛠️',
//     coverImage: null
//   }
// ]
