export interface IGroup {
  id: string;
  name: string;
  type: 'posts' | 'meetups' | 'podcasts';
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

// interface ContentGroup {
//   contentId: string;
//   content: Content;
//   groupId: string;
//   group: Group;
// }
