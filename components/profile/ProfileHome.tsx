import Image from 'next/image';
import { Button } from '../ui/button';
import BadgeItem from '../shared/BadgeItem';
import Link from 'next/link';
import ProfileNavLinks from './ProfileNavLinks';
import HeartIcon from '../icons/Heart';
import PostItem from './PostItem';

// ----------------------------------------------------------------

interface IProfileHomeProps {}

const TECH_STACK_ITEMS = [
  'Node.js',
  'HTML',
  'React.js',
  'Next.js',
  'TypeScript',
  'CSS',
  'Sass',
];

/**
 * 1. default url nema query params
 * 2. saljem req GET  sa contentType=posts i page=1
 * 3. za params page=1 samo radim params.set('page', value)
 * 4. intersection observer za page
 * 5. provera za quyer params da li je string undefined ili array( ako je array uzeti [0])
 */

/**
 * REUSABLE
 * 1. isMyProfile
 * 2. pitati za paragrafe boja itd
 */

const ProfileHome: React.FC<IProfileHomeProps> = (props) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar bg-light100__dark800 text-center h-full rounded-t-2xl pb-7 rounded-b-2xl">
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
          <div className="relative z-10 -mt-14">
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
            <BadgeItem isTechStackItem title="Node.js" />
            <BadgeItem isTechStackItem title="HTML" />
            <BadgeItem isTechStackItem title="React.js" />
            <BadgeItem isTechStackItem title="Next.js" />
            <BadgeItem isTechStackItem title="TypeScript" />
            <BadgeItem isTechStackItem title="CSS" />
          </ul>
          <div className="border border-[#C5D0E6] dark:border-[#393E4F]" />
          <p className="p3-regular text-white-400 dark:text-white-300 text-center">
            Tech Student, aspiring to bring ideas to life through side projects.
            Fluent in React.js, Next.js, & TS.
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/">
              <Image
                src="/assets/icons/social-media/linkedin.svg"
                width={20}
                height={20}
                alt="linkedin"
              />
            </Link>
            <Link href="/">
              <Image
                src="/assets/icons/social-media/twitter.svg"
                width={20}
                height={20}
                alt="twitter"
              />
            </Link>
            <Link href="/">
              <Image
                src="/assets/icons/social-media/instagram.svg"
                width={20}
                height={20}
                alt="instagram"
              />
            </Link>
          </div>
          <p className="p3-medium text-white-300 dark:text-white-400">
            joined 2 years ago
          </p>
        </div>
      </aside>
      <main className="main-content">
        <div className="flex flex-col gap-5">
          <ProfileNavLinks />
          <ul>
            <PostItem imgUrl="/assets/images/post-example.svg" />
          </ul>
        </div>
      </main>
      <aside className="right-sidebar bg-blue-500">RIGHT SIDEBAR</aside>
    </div>
  );
};

export default ProfileHome;
