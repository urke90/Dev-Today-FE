import Image from 'next/image';
import BadgeItem from '../shared/BadgeItem';
import { EQueryContentType } from '@/types/content';
import type { IUser, IUserLatestContents } from '@/types/user';
import ContentNavLinks from '../shared/ContentNavLinks';
import PerformanceItem from './PerformanceItem';
import SidebarContentCard from '../shared/SidebarContentCard';
import PostItemCard from '../shared/PostItemCard';
import PodcastItemCard from '../shared/PodcastItemCard';
import MeetupItemCard from '../shared/MeetupItemCard';
import GroupItemCard from '../shared/GroupItemCard';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import SocialMediaLinks from './SocialMediaLinks';
import ContentList from '../shared/ContentList';

// ----------------------------------------------------------------

interface IProfileHomeProps {
  user: IUser;
  contentType: EQueryContentType;
  latestContent: IUserLatestContents[];
  isPersonalProfile?: boolean;
  isFollowing?: boolean;
}

const ProfileHome: React.FC<IProfileHomeProps> = ({
  isPersonalProfile = false,
  user,
  contentType,
  latestContent,
  isFollowing,
}) => {
  const {
    avatarImg,
    bio,
    codingAmbitions,
    createdAt,
    currentKnowledge,
    email,
    followers,
    following,
    id,
    name,
    preferredSkills,
    userName,
    linkedinLink,
    twitterLink,
    instagramLink,
  } = user ?? {};
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar bg-light100__dark800 !p-0 !pb-5 text-center rounded-t-2xl rounded-b-2xl">
        <div className="relative h-[106px] lg:h-[83px] profile-background rounded-t-2xl">
          <Image
            fill
            src="/assets/images/profile-background.svg"
            alt="profile bacground"
            className="rounded-t-2xl object-cover"
          />
        </div>
        <div className="px-5 flex flex-col gap-y-6">
          <div className="relative z-10 -mt-14">
            <Image
              src={avatarImg ? avatarImg : '/assets/images/no-image.svg'}
              width={110}
              height={110}
              alt="profile"
              className="ring-4 ring-primary-500 rounded-full mx-auto mb-2.5"
            />
            <h1 className="h1-medium">{userName}</h1>
            <p className="p3-regular dark:text-white-400">{email}</p>
          </div>
          <ProfileSidebarInfo isPersonalProfile={isPersonalProfile} />
          <div className="flex justify-center gap-[7px] gap-y-0 sm:flex-col">
            <p className="p3-medium text-white-400 dark:text-white-300">
              {followers.length} Followers
            </p>
            <p className="p3-medium text-white-400 dark:text-white-300">
              {following.length} Following
            </p>
          </div>
          {preferredSkills.length > 0 && (
            <ul className="flex flex-wrap gap-1 ">
              {preferredSkills.map((skill) => (
                <BadgeItem
                  key={skill}
                  isTechStackItem
                  title={skill}
                  classNames="h-[22px] grow"
                />
              ))}
            </ul>
          )}
          <div className="border border-[#C5D0E6] dark:border-[#393E4F]" />
          {bio && (
            <p className="p3-regular text-white-400 dark:text-white-300 text-center"></p>
          )}
          <div className="flex gap-6 justify-center">
            <SocialMediaLinks
              linkedinLink={linkedinLink}
              twitterLink={twitterLink}
              instagramLink={instagramLink}
            />
          </div>
          <p className="p3-medium text-white-300 dark:text-white-400">
            joined 2 years ago
          </p>
        </div>
      </aside>
      <main className="main-content w-full mx-auto">
        <div className="flex w-full flex-col gap-5">
          <ContentNavLinks />
          <ContentList contentType={contentType} items={[]} />
        </div>
      </main>
      <aside className="right-sidebar">
        <div className="max-xl:hidden">
          <SidebarContentCard title="Recent Posts" items={[]} />
        </div>
        <div className="right-sidebar-item">
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
