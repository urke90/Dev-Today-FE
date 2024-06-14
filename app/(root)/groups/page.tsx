import { auth } from '@/app/api/auth/[...nextauth]/route';
import GroupHome from '@/components/group/GroupHome';
import { EContentType, IContent } from '@/types/content';
import type { IAllGroupsResponse } from '@/types/group';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

const podcastItem: IContent[] = [
  {
    title: 'JavaScript Essentials',
    description:
      'A deep dive into JavaScript fundamentals and advanced concepts.',
    id: 'podcast-001',
    tags: [
      { title: 'JavaScript', id: 'tag-001' },
      { title: 'Programming', id: 'tag-002' },
    ],
    type: EContentType.PODCAST,
    author: {
      name: 'Alice Johnson',
      avatarImg: '',
    },
    authorId: 'author-001',
    createdAt: new Date(),
    updatedAt: new Date(),
    likedBy: [],
    likes: undefined,
    postGroups: [],
    coverImage: null,
    meetupLocationImage: null,
    meetupDate: null,
    podcastFile: null,
    podcastTitle: null,
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
  {
    title: 'React Best Practices',
    description: 'Learn the best practices for building React applications.',
    id: 'podcast-002',
    tags: [
      { title: 'React', id: 'tag-003' },
      { title: 'Frontend', id: 'tag-004' },
    ],
    type: EContentType.PODCAST,
    author: {
      name: 'Bob Smith',
      avatarImg: '',
    },
    authorId: 'author-002',
    createdAt: new Date(),
    updatedAt: new Date(),
    likedBy: [],
    likes: undefined,
    postGroups: [],
    coverImage: null,
    meetupLocationImage: null,
    meetupDate: null,
    podcastFile: null,
    podcastTitle: null,
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
  {
    title: 'Next.js in Action',
    description:
      'Explore the capabilities and features of Next.js for server-side rendering.',
    id: 'podcast-003',
    tags: [
      { title: 'Next.js', id: 'tag-005' },
      { title: 'SSR', id: 'tag-006' },
    ],
    type: EContentType.PODCAST,
    author: {
      name: 'Carol White',
      avatarImg: '',
    },
    authorId: 'author-003',
    createdAt: new Date(),
    updatedAt: new Date(),
    likedBy: [],
    likes: undefined,
    postGroups: [],
    coverImage: null,
    meetupLocationImage: null,
    meetupDate: null,
    podcastFile: null,
    podcastTitle: null,
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
];

const postItems: IContent[] = [
  {
    coverImage: null,
    title: 'Understanding TypeScript',
    author: { name: 'Jane Doe', avatarImg: '' },
    authorId: 'author-004',
    id: 'post-001',
    type: EContentType.POST,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    likedBy: [],
    likes: undefined,
    postGroups: [],
    meetupLocationImage: null,
    meetupDate: null,
    podcastFile: null,
    podcastTitle: null,
    tags: [],
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
  {
    coverImage: null,
    title: 'Next.js for Beginners',
    author: { name: 'John Smith', avatarImg: '' },
    authorId: 'author-005',
    id: 'post-002',
    type: EContentType.POST,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    likedBy: [],
    likes: undefined,
    postGroups: [],
    meetupLocationImage: null,
    meetupDate: null,
    podcastFile: null,
    podcastTitle: null,
    tags: [],
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
];

const meetupItems: IContent[] = [
  {
    title: 'Tech Innovators Meetup',
    meetupDate: new Date('2024-07-20T18:00:00Z'),
    meetupLocation: 'San Francisco, CA',
    id: 'meetup-001',
    tags: [
      { title: 'Innovation', id: 'tag-007' },
      { title: 'Networking', id: 'tag-008' },
    ],
    type: EContentType.MEETUP,
    author: { name: '', avatarImg: '' },
    authorId: 'author-006',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    likedBy: [],
    likes: undefined,
    postGroups: [],
    coverImage: null,
    meetupLocationImage: null,
    podcastFile: null,
    podcastTitle: null,
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
  {
    title: 'Frontend Developers Summit',
    meetupDate: new Date('2024-08-15T09:00:00Z'),
    meetupLocation: 'New York, NY',
    id: 'meetup-002',
    tags: [
      { title: 'Frontend', id: 'tag-009' },
      { title: 'JavaScript', id: 'tag-010' },
    ],
    type: EContentType.MEETUP,
    author: { name: '', avatarImg: '' },
    authorId: 'author-007',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    likedBy: [],
    likes: undefined,
    postGroups: [],
    coverImage: null,
    meetupLocationImage: null,
    podcastFile: null,
    podcastTitle: null,
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
  {
    title: 'AI and Machine Learning Conference',
    meetupDate: new Date('2024-09-10T10:00:00Z'),
    meetupLocation: 'Los Angeles, CA',
    id: 'meetup-003',
    tags: [
      { title: 'AI', id: 'tag-011' },
      { title: 'Machine Learning', id: 'tag-012' },
    ],
    type: EContentType.MEETUP,
    author: { name: '', avatarImg: '' },
    authorId: 'author-008',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    likedBy: [],
    likes: undefined,
    postGroups: [],
    coverImage: null,
    meetupLocationImage: null,
    podcastFile: null,
    podcastTitle: null,
    comments: [],
    contentGroups: [],
    viewsCount: null,
    likesCount: null,
    commentsCount: null,
    groupId: null,
    isLiked: false,
  },
];

const GroupsPage: React.FC = async () => {
  const session = await auth();
  if (!session) throw new Error('User session is not available!');

  const groups = await typedFetch<IAllGroupsResponse>({
    url: '/groups?members=true',
  });

  if (!groups) throw new Error('Internal server error!');

  console.log('GROUPS U ROOT GROUPS', groups);

  const sidebarItems = {
    posts: postItems,
    meetups: meetupItems,
    podcasts: podcastItem,
  };

  return (
    <section className="px-3.5 lg:px-5">
      <GroupHome
        groupsData={groups}
        userId={session.user.id}
        postItems={postItems as IContent[]}
        meetupItems={meetupItems}
        podcastItems={podcastItem}
      />
    </section>
  );
};

export default GroupsPage;
