import { EContentType } from '@/types/content';
export const CLOUDINARY_URL =
  'https://res.cloudinary.com/dev-today/image/upload';

export const regWelcome = [
  {
    image: '/assets/icons/business-dark.svg',
    alt: 'business',
    label:
      'Discover the latest trends, tools, and insights shaping the developer world.',
  },

  {
    image: '/assets/icons/chat-dark.svg',
    alt: 'chat',
    label: 'Forge connections, collaborate on projects, and grow together.',
  },
  {
    image: '/assets/icons/inbox-dark.svg',
    alt: 'inbox',
    label:
      'Elevate your coding with exclusive content for professional growth.',
  },
];

export const loginWelcome = [
  {
    image: '/assets/icons/inbox-green.svg',
    alt: 'inbox',
    label:
      'Get in the code zone quickly! Swift sign-in for instant access to your hub.',
  },
  {
    image: '/assets/icons/tunder.svg',
    alt: 'tunder',
    label:
      'Get in the code zone quickly! Swift sign-in for instant access to your hub.',
  },
];

export const onboardingWelcome = [
  {
    image: '/assets/icons/rocket.svg',
    alt: 'rocket',
    label: 'Highlight your skills and projects for the community.',
  },
  {
    image: '/assets/icons/chat-dark.svg',
    alt: 'chat',
    label: 'Explore learning opportunities and connect with mentors',
  },
];

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

export const postTypes = [
  {
    title: 'post',
    value: EContentType.POST,
    image: '/assets/icons/frame-white.svg',
  },
  {
    title: 'meetup',
    value: EContentType.MEETUP,
    image: '/assets/icons/calendar-white.svg',
  },
  {
    title: 'podcast',
    value: EContentType.PODCAST,
    image: '/assets/icons/podcast.svg',
  },
];
