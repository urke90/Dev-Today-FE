import Image from 'next/image';
import { Button } from '../ui/button';
import BadgeItem from '../shared/BadgeItem';
import Link from 'next/link';
import ProfileNavLinks from './ProfileNavLinks';
import PostItemCard from '../shared/PostItemCard';
import PerformanceItem from './PerformanceItem';
import SidebarContentCard from '../shared/SidebarContentCard';
import MeetupItemCard from '../shared/MeetupItemCard';

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
      <aside className="left-sidebar bg-light100__dark800 !p-0 !pb-5 text-center rounded-t-2xl rounded-b-2xl">
        <div className="relative h-[106px] lg:h-[83px] profile-background rounded-t-2xl">
          <Image
            fill
            src="/assets/images/profile-background.svg"
            alt="profile bacground"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
        <div className="px-5 flex flex-col gap-y-6">
          <div className="relative z-10 -mt-14">
            <Image
              src="/assets/images/no-image.svg"
              width={110}
              height={110}
              alt="profile"
              className="ring-4 ring-primary-500 rounded-full mx-auto mb-2.5"
            />
            <h1 className="h1-medium">JS Mastery</h1>
            <p className="p3-regular dark:text-white-400">@jsmastery</p>
          </div>
          <Button variant="primary" size="small">
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
      <main className="main-content mx-auto">
        <div className="flex flex-col gap-5">
          <ProfileNavLinks />
          <ul className="flex flex-col gap-5">
            {/* <p>NO DATA AT THE MOMENT</p> */}
            {/* <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" />
            <PostItemCard imgUrl="/assets/images/post-example.svg" /> */}
            <MeetupItemCard
              imgUrl="/assets/images/meetup-example.svg"
              title="A Deep Dive into the Latest UI/UX Trends and Techniques"
              location="Innovation Hub, Austin"
              description="Elevate your web development skills by delving into the latest UI/UX
              trends and techniques. Join us for an insightful session filled with
              hands-on demonstrations, expert-led discussions, and networking
              opportunities."
              date="FEB 3"
              tags={['Developer', 'Tech Guru', 'Software']}
            />
          </ul>
        </div>
      </main>
      <aside className="right-sidebar">
        <div className="max-xl:hidden">
          <SidebarContentCard title="Recent Posts" items={[]} />
        </div>
        <div className="right-sidebar-item ">
          <div>
            <p className="p2-bold">Performance</p>
            <p className="p3-regular">The best posts from the last 30 days</p>
          </div>
          <ul className="flex flex-col gap-5">
            <PerformanceItem />
            <PerformanceItem />
            <PerformanceItem />
            <PerformanceItem />
            <PerformanceItem />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ProfileHome;
