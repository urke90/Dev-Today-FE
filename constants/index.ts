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
      bgColor: '#FFECE6',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/chat-orange.svg',
      alt: 'Chat',
      label: 'Forge connections, collaborate on projects, and grow together.',
      bgColor: '#FDF4EA',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/inbox-blue.svg',
      alt: 'inbox',
      label:
        'Elevate your coding with exclusive content for professional growth.',
      bgColor: '#EBF2FC',
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
      bgColor: '#FFECE6 ',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/thunder.svg',
      alt: 'tunder',
      label: 'Trouble logging in? Reset your password.',
      bgColor: '#FDF4EA',
    },
  ],
};

export const ONBOARDING_STEP_1_DATA: IAuthOnboardingSidebarData = {
  title: 'Tell us a little about yourself!',
  listItems: [
    {
      imgUrl: '/assets/icons/auth-onboarding/rocket.svg',
      alt: 'Rocket',
      label: 'Highlight your skills and projects for the community.',
      bgColor: '#FFECE6',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/chat-orange.svg',
      alt: 'Chat',
      label: 'Explore learning opportunities and connect with mentors.',
      bgColor: '#FDF4EA',
    },
  ],
};

export const ONBOARDING_STEP_2_DATA: IAuthOnboardingSidebarData = {
  title: 'Tell us a little about yourself!',
  listItems: [
    {
      imgUrl: '/assets/icons/auth-onboarding/rocket.svg',
      alt: 'Rocket',
      label:
        'Outline your coding journey by setting ambitious and achievable goals.',
      bgColor: '#FFECE6',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/chat-orange.svg',
      alt: 'Chat',
      label: 'Share your coding triumphs and achievements with the community.',
      bgColor: '#FDF4EA',
    },
  ],
};

export const ONBOARDING_STEP_3_DATA: IAuthOnboardingSidebarData = {
  title: 'Tell us a little about yourself!',
  listItems: [
    {
      imgUrl: '/assets/icons/auth-onboarding/rocket.svg',
      alt: 'Rocket',
      label:
        'Paint your coding canvas by selecting your favorite languages & frameworks.',
      bgColor: '#FFECE6',
    },
    {
      imgUrl: '/assets/icons/auth-onboarding/chat-orange.svg',
      alt: 'Chat',
      label: 'Share your coding triumphs and achievements with the community.',
      bgColor: '#FDF4EA',
    },
  ],
};

export const generateOnboardingStepData = (step: number) => {
  switch (step) {
    case 1:
      return ONBOARDING_STEP_1_DATA;
    case 2:
      return ONBOARDING_STEP_2_DATA;
    case 3:
      return ONBOARDING_STEP_3_DATA;
    default:
      return ONBOARDING_STEP_1_DATA;
  }
};

export const CURRENT_KNOWLEDGE = [
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

export const CODING_AMBITIONS = [
  { title: 'Build Portfolio - Showcase projects', value: 'portfolio' },
  { title: 'Open Source Contributor - Make your mark', value: 'contributor' },
  { title: 'Master New Language - Learn and conquer', value: 'language' },
  { title: 'Launch Side Project - Bring ideas to life', value: 'project' },
  { title: 'Attend Coding Events - Network and learn', value: 'events' },
];

export const PREFERRED_SKILLS = [
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
