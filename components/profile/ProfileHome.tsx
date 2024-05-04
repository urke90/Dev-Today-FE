import Image from 'next/image';
import { Button } from '../ui/button';
import TechStackItem from './TechStackItem';

// ----------------------------------------------------------------

interface IProfileHomeProps {
  string: string[];
}

const TECH_STACK_ITEMS = [
  'Node.js',
  'HTML',
  'React.js',
  'Next.js',
  'TypeScript',
  'CSS',
  'Sass',
];

const ProfileHome: React.FC<IProfileHomeProps> = (props) => {
  return (
    <div className="relative m-auto top-[94px] lg:top-[100px] flex flex-col sm:flex-row">
      <aside className="left-sidebar bg-light100__dark800 text-center h-full rounded-t-2xl pb-7 rounded-b-2xl">
        {/* <div className="flex flex-col gap-y-5 rounded-t-2xl"> */}
        <div className="relative h-[106px] lg:h-[83px] profile-background rounded-t-2xl">
          <Image
            fill
            src="/assets/images/profile-background.svg"
            alt="profile bacground"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
        <div className="px-5 flex flex-col gap-y-6 md:gap-y-5">
          <div className="relative z-10 -mt-16">
            <Image
              src="/assets/images/no-image.svg"
              width={110}
              height={110}
              alt="profile"
              className="ring-4 ring-primary-500 rounded-full mx-auto"
            />
            <h1 className="h1-medium">JS Mastery</h1>
            <p className="p3-regular dark:text-white-400">@jsmastery</p>
          </div>
          <Button variant="primary" size="small" className="md:mb-5 mb-4">
            Follow
          </Button>
          <div className="flex justify-center gap-[7px] gap-y-0 sm:flex-col">
            <p className="p3-medium text-white-400 dark:text-white-300">
              314 Followers
            </p>
            <p className="p3-medium text-white-400 dark:text-white-300">
              47 Following
            </p>
          </div>
          <ul className="flex flex-wrap gap-y-1 justify-between">
            <TechStackItem title="Node.js" />
            <TechStackItem title="HTML" />
            <TechStackItem title="React.js" />
            <TechStackItem title="Next.js" />
            <TechStackItem title="TypeScript" />
            <TechStackItem title="CSS" />
          </ul>
          <div className="border border-[#C5D0E6] dark:border-[#393E4F]" />
          <p className="p3-regular text-white-400 dark:text-white-300 text-center">
            Tech Student, aspiring to bring ideas to life through side projects.
            Fluent in React.js, Next.js, & TS.
          </p>
          <div className="flex gap-6 justify-center">
            <Image
              src="/assets/icons/social-media/linkedin.svg"
              width={20}
              height={20}
              alt="linkedin"
            />
            <Image
              src="/assets/icons/social-media/twitter.svg"
              width={20}
              height={20}
              alt="twitter"
            />
            <Image
              src="/assets/icons/social-media/instagram.svg"
              width={20}
              height={20}
              alt="instagram"
            />
          </div>
          <p className="p3-medium text-white-300 dark:text-white-400">
            joined 2 years ago
          </p>
        </div>
        {/* </div> */}
      </aside>
      <main className="flex flex-1">MAIN</main>
      <aside className="right-sidebar bg-light100__dark800">
        RIGHT SIDEBAR
      </aside>
    </div>
  );
};

export default ProfileHome;
