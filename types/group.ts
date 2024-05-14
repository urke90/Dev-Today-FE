export interface IGroupMember {
  user: {
    id: string;
    avatarImg: string;
  };
}

export interface IGroup {
  id: string;
  name: string;
  coverImg: string;
  groupBio: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    members: number;
  };
  members: IGroupMember[];
}

export interface IGroupContent {
  group: IGroup;
}

// interface ContentGroup {
//   contentId: string;
//   content: Content;
//   groupId: string;
//   group: Group;
// }
