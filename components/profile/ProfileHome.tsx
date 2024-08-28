import ContentListProfile from './ContentListProfile';
import PerformanceItem from './PerformanceItem';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import SocialMediaLinks from './SocialMediaLinks';

import BadgeItem from '../shared/BadgeItem';
import ContentNavLinks from '../shared/ContentNavLinks';
import SidebarContentCard from '../shared/RightSidebarItems/SidebarContentCard';

import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';

import { CLOUDINARY_URL } from '@/constants';
import type { IProfilePageContentResponse } from '@/types/content';
import type { IProfilePageGroupsResponse } from '@/types/group';
import { EQueryType } from '@/types/queries';
import type { IProfileUser } from '@/types/user';
import { calculateTimeAgo } from '@/utils/format';

// ----------------------------------------------------------------

interface IProfileHomeProps {
  user: IProfileUser;
  contentType: EQueryType;
  isPersonalProfile?: boolean;
  isFollowing?: boolean;
  contentData: IProfilePageContentResponse;
  groupsData: IProfilePageGroupsResponse;
  viewerId: string;
}

const ProfileHome: React.FC<IProfileHomeProps> = ({
  isPersonalProfile = false,
  user,
  contentType,
  isFollowing = false,
  contentData,
  groupsData,
  viewerId,
}) => {
  const transformedAvatarImg = user.avatarImg.startsWith(CLOUDINARY_URL)
    ? getCldImageUrl({
        width: 100,
        height: 100,
        src: user.avatarImg,
        crop: 'fill',
      })
    : user.avatarImg;

  return (
    <div className="content-wrapper">
      <aside className="left-sidebar bg-light100__dark800 rounded-2xl !p-0 !pb-10 text-center shadow-card">
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
              src={transformedAvatarImg || '/assets/icons/image-preview.svg'}
              width={110}
              height={110}
              alt="profile"
              className="mx-auto mb-2.5 rounded-full ring-4 ring-primary-500"
            />
            <h1 className="h1-medium">{user.userName}</h1>
            <p className="p3-regular dark:text-white-400">{user?.email}</p>
          </div>
          <ProfileSidebarInfo
            userProfileId={user.id}
            viewerId={viewerId}
            isPersonalProfile={isPersonalProfile}
            isFollowing={isFollowing}
          />
          <div className="flex justify-center gap-[7px] gap-y-0 sm:flex-col">
            <p className="p3-medium text-white-400 dark:text-white-300">
              {user?._count?.followers} Followers
            </p>
            <p className="p3-medium text-white-400 dark:text-white-300">
              {user?._count?.following} Following
            </p>
          </div>
          {user?.preferredSkills.length > 0 && (
            <ul className="flex flex-wrap gap-1">
              {user.preferredSkills.map((skill) => (
                <BadgeItem key={skill} isTechStackItem title={skill} />
              ))}
            </ul>
          )}
          <div className="border border-[#C5D0E6] dark:border-[#393E4F]" />
          {user?.bio && (
            <p className="p3-regular text-center text-white-400 dark:text-white-300">
              {user.bio}
            </p>
          )}
          {(user?.linkedinLink || user?.twitterLink || user?.instagramLink) && (
            <div className="flex-center gap-6">
              <SocialMediaLinks
                linkedinLink={user?.linkedinLink}
                twitterLink={user?.twitterLink}
                instagramLink={user?.instagramLink}
              />
            </div>
          )}
          <p className="p3-medium text-white-300 dark:text-white-400">
            Joined {calculateTimeAgo(user.createdAt)}
          </p>
        </div>
      </aside>
      <main className="main-content mx-auto w-full">
        <div className="flex w-full flex-col gap-5">
          <ContentNavLinks />
          <ContentListProfile
            contentType={contentType}
            contentData={contentData}
            groupsData={groupsData}
            userId={user.id}
            author={{
              userName: user.userName,
              avatarImg: user.avatarImg,
            }}
            viewerId={viewerId}
          />
        </div>
      </main>
      <aside className="right-sidebar">
        <div className="max-xl:hidden">
          <SidebarContentCard title="Recent Posts" items={user?.contents} />
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
