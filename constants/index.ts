import { EContentType } from '@/types/content';

// ----------------------------------------------------------------

export const CLOUDINARY_URL =
  'https://res.cloudinary.com/dev-today/image/upload';

export interface IAuthOnboardingSidebarData {
  title: string;
  listItems: {
    imgUrl: string;
    alt: string;
    label: string;
    bgColor?: string;
  }[];
}

export const SIGN_UP_SIDEBAR_DATA: IAuthOnboardingSidebarData = {
  title:
    'Join our developer community! Sign up now and be part of the conversation. ',
  listItems: [
    {
      imgUrl: '/assets/icons/auth-onboarding/business.svg',
      alt: 'business',
      label:
        'Discover the latest trends, tools, and insights shaping the developer world.',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/chat-orange.svg',
      alt: 'Chat',
      label: 'Forge connections, collaborate on projects, and grow together.',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/inbox-blue.svg',
      alt: 'inbox',
      label:
        'Elevate your coding with exclusive content for professional growth.',
    },
  ],
};

export const SIGN_IN_SIDEBAR_DATA: IAuthOnboardingSidebarData = {
  title: 'Sign in to DevToday.',
  listItems: [
    {
      imgUrl: '/assets/icons/auth-onboarding/inbox-green.svg',
      alt: 'inbox',
      label:
        'Get in the code zone quickly! Swift sign-in for instant access to your hub.',
      bgColor: '#E7FAF4',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/thunder.svg',
      alt: 'tunder',
      label: 'Trouble logging in? Reset your password.',
      bgColor: '#FDF4EA',
    },
  ],
};

export const ONBOARDING_DATA: IAuthOnboardingSidebarData = {
  title: 'Tell us a little about yourself!',
  listItems: [
    {
      imgUrl: '/assets/icons/rocket.svg',
      alt: 'Rocket',
      label: 'Highlight your skills and projects for the community.',
      bgColor: '#FFECE6',
    },
    {
      imgUrl: '/assets/icons/chat-orange.svg',
      alt: 'Chat',
      label: 'Explore learning opportunities and connect with mentors.',
      bgColor: '#FDF4EA',
    },
  ],
};

export const currentKnowledge = [
  { title: 'Seasoned Pro - Coding veteran', value: 'pro' },
  {
    title: 'Learning Enthusiast - Continuous learner',
    value: 'learning-enthusiast',
  },
  { title: 'Project Explorer - Passionate builder', value: 'explorer' },
  { title: 'Tech Student - Studying programming.', value: 'student' },
  {
    title: 'Tech Explorer - New to coding, eager to learn',
    value: 'tech-explorer',
  },
];
export const codingAmbitions = [
  { title: 'Build Portfolio - Showcase projects', value: 'portfolio' },
  { title: 'Open Source Contributor - Make your mark', value: 'contributor' },
  { title: 'Master New Language - Learn and conquer', value: 'language' },
  { title: 'Launch Side Project - Bring ideas to life', value: 'project' },
  { title: 'Attend Coding Events - Network and learn', value: 'events' },
];

export const preferSkills = [
  { title: 'HTML5' },
  { title: 'JavaScript(ES6)' },
  { title: 'React.js' },
  { title: 'Node.js' },
  { title: 'TypeScript' },
  { title: 'CSS 3' },
  { title: 'Vue.js' },
  { title: 'Angular' },
  { title: 'Express.js' },
  { title: 'MongoDB' },
  { title: 'Next.js 14' },
  { title: 'D3.js' },
  { title: 'GraphQL' },
  { title: 'Tailwind CSS' },
];

export const CONTENT_TYPES = [
  {
    title: 'Post',
    value: EContentType.POST,
    image: '/assets/icons/frame-white.svg',
  },
  {
    title: 'Meetup',
    value: EContentType.MEETUP,
    image: '/assets/icons/calendar-white.svg',
  },
  {
    title: 'Podcast',
    value: EContentType.PODCAST,
    image: '/assets/icons/podcast.svg',
  },
];
