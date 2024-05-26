export interface IGroup {
  id: string;
  name: string;
  type: 'post' | 'meetup' | 'podcast';
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
