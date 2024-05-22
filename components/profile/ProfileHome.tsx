import PerformanceItem from './PerformanceItem';
import ProfileSidebarInfo from './ProfileSidebarInfo';

import BadgeItem from '../shared/BadgeItem';
import ContentList from '../shared/ContentList';
import ContentNavLinks from '../shared/ContentNavLinks';
import SidebarContentCard from '../shared/SidebarContentCard';

import Image from 'next/image';

import { EQueryContentType, IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
import type { IProfileUser, IUserLatestContents } from '@/types/user';
import { calculateTimeAgo } from '@/utils/format';

// ----------------------------------------------------------------

interface IProfileHomeProps {
  user: IProfileUser;
  contentType: EQueryContentType;
  latestContent: IUserLatestContents[];
  isPersonalProfile?: boolean;
  isFollowing?: boolean;
  contentItems: IContent[];
  groupItems: IGroup[];
}

const ProfileHome: React.FC<IProfileHomeProps> = ({
  isPersonalProfile = false,
  user,
  contentType,
  latestContent,
  isFollowing = false,
  contentItems,
  groupItems,
}) => {
  const {
    id,
    name,
    avatarImg,
    bio,
    email,
    createdAt,
    followers,
    following,
    preferredSkills,
    userName,
    linkedinLink,
    twitterLink,
    instagramLink,
    contents,
  } = user ?? {};

  return (
    <div className="content-wrapper">
      <aside className="left-sidebar bg-light100__dark800 rounded-2xl !p-0 !pb-10 text-center">
        <div className="profile-background relative h-[106px] rounded-t-2xl lg:h-[83px]">
          <Image
            fill
            src="/assets/images/profile-background.svg"
            alt="profile bacground"
            className="rounded-t-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-6 px-5">
          <div className="relative z-10 -mt-20">
            <Image
              src={avatarImg ? avatarImg : '/assets/images/no-image.svg'}
              width={110}
              height={110}
              alt="profile"
              className="ring-primary-500 mx-auto mb-2.5 rounded-full ring-4"
            />
            <h1 className="h1-medium">{userName}</h1>
            <p className="p3-regular dark:text-white-400">{email}</p>
          </div>
          <ProfileSidebarInfo
            isPersonalProfile={isPersonalProfile}
            isFollowing={isFollowing}
          />
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
          {linkedinLink || twitterLink || instagramLink}
          <p className="p3-medium text-white-300 dark:text-white-400">
            Joined {calculateTimeAgo(createdAt)}
          </p>
        </div>
      </aside>
      <main className="main-content mx-auto w-full">
        <div className="flex w-full flex-col gap-5">
          <ContentNavLinks />
          <ContentList
            contentType={contentType}
            contentItems={contentItems}
            groupItems={groupItems}
            userId={id}
            userName={name}
          />
        </div>
      </main>
      <aside className="right-sidebar">
        <div className="max-xl:hidden">
          <SidebarContentCard
            title="Recent Posts"
            items={contents}
            author={name}
          />
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
