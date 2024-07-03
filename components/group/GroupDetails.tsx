import type {
  IDetailsPageGroup,
  IGroupContentResponse,
  IGroupMembersResponse,
  IGroupWithCount,
} from '@/types/group';
import { EQueryType } from '@/types/queries';
import { EUserRole } from '@/types/user';
import Image from 'next/image';
import SidebarGroupItem from '../shared/LeftSidebarItems/SidebarGroupItem';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import SidebarContentCard from '../shared/RightSidebarItems/SidebarContentCard';
import GroupAdminsDialog from './GroupAdminsDialog';
import GroupContent from './GroupContent';
import GroupDropdownMenu from './GroupDropdownMenu';
import GroupUsersDialog from './GroupUsersDialog';
import JoinOrLeaveGroupButton from './JoinOrLeaveGroupButton';

// ----------------------------------------------------------------

interface IGroupDetailsProps {
  group: IDetailsPageGroup;
  topRankedGroups: IGroupWithCount[] | undefined;
  contentType: EQueryType;
  isGroupOwner: boolean;
  isGroupAdmin: boolean;
  isGroupUser: boolean;
  groupContent: IGroupContentResponse;
  groupMembers: IGroupMembersResponse;
  viewerId: string;
}

const GroupDetails: React.FC<IGroupDetailsProps> = ({
  group,
  contentType,
  topRankedGroups,
  isGroupOwner,
  isGroupAdmin,
  isGroupUser,
  groupContent,
  groupMembers,
  viewerId,
}) => {
  const isGroupMember = !isGroupOwner && (isGroupUser || isGroupAdmin);

  const membersCount = { users: 0, admins: 0 };
  group.members.forEach((member) =>
    member.role === EUserRole.USER
      ? membersCount.users++
      : membersCount.admins++
  );

  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <div className="left-sidebar-item gap-3">
          <p className="p2-bold">About Group</p>
          <p className="p4-regular">{group.bio}</p>
        </div>
        <div className="left-sidebar-item gap-3">
          <p className="p2-bold">Statistical Highlights</p>
          <ul className="flex md:flex-col  gap-2.5">
            <li className="flex items-center gap-1 p3-bold">
              <span className="p3-medium !text-primary-500">
                {group._count.contents}
              </span>
              Posts
            </li>
            <li className="flex items-center gap-1 p3-bold">
              <span className="p3-medium !text-primary-500">
                {membersCount.users}
              </span>
              Members
            </li>
            <li className="flex items-center gap-1 p3-bold">
              <span className="p3-medium !text-primary-500">
                {membersCount.admins}
              </span>
              Admins
            </li>
          </ul>
        </div>
        <div className="max-md:hidden">
          {topRankedGroups && (
            <SidebarItemWrapper
              title="Top Ranked"
              items={topRankedGroups?.map(
                ({ id, profileImage, name, _count }) => (
                  <SidebarGroupItem
                    key={id}
                    id={id}
                    profileImage={profileImage}
                    name={name}
                    totalItems={_count.members}
                  />
                )
              )}
            />
          )}
        </div>
      </aside>
      <main className="main-content gap-5  mx-auto">
        <div className="flex flex-col gap-2.5 bg-light100__dark800 py-4 px-2.5 md:py-2.5 rounded-2xl shadow-card">
          <div
            className={`relative w-full h-24 md:h-44 ${!group.coverImage ? 'flex-center bg-primary-100 dark:bg-black-700 rounded-[10px]' : ''}`}
          >
            {group.coverImage ? (
              <Image
                fill
                src={group.coverImage}
                alt={group.name}
                className="rounded-[10px] object-cover"
              />
            ) : (
              <Image
                width={40}
                height={40}
                src="/assets/icons/image-preview.svg"
                alt={group.name}
                className="rounded-[10px]"
              />
            )}
          </div>
          <div className="flex-between gap-2.5 md:px-2.5">
            <div className="flex items-center gap-3.5 md:gap-5">
              <div className="relative size-14 md:size-[70px]">
                <Image
                  fill
                  src={group.profileImage || '/assets/icons/image-preview.svg'}
                  alt={group.name}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="p1-bold">{group.name}</p>
                <p className="p3-regular">
                  <span className="text-white-400">Created by</span>{' '}
                  {group.author.userName}
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="max-md:hidden">
                {!isGroupOwner && (
                  <JoinOrLeaveGroupButton
                    userId={viewerId}
                    groupId={group.id}
                    isGroupMemeber={isGroupMember}
                  />
                )}
              </div>
              <GroupDropdownMenu
                groupId={group.id}
                viewerId={viewerId}
                isGroupOwner={isGroupOwner}
              />
            </div>
          </div>
          <div className="md:hidden">
            {!isGroupOwner && (
              <JoinOrLeaveGroupButton
                userId={viewerId}
                groupId={group.id}
                isGroupMemeber={isGroupMember}
              />
            )}
          </div>
        </div>
        <GroupContent
          contentType={contentType}
          groupContent={groupContent}
          groupMembers={groupMembers}
          viewerId={viewerId}
          groupId={group.id}
        />
      </main>
      <aside className="right-sidebar">
        {groupContent?.contents?.length > 0 && (
          <SidebarContentCard title="Meetups" items={group.contents} />
        )}
        <div className="right-sidebar-item">
          <div className="flex-between">
            <p className="p2-bold">Active Members</p>
            <GroupUsersDialog groupId={group.id} />
          </div>
          <ul className="flex flex-wrap gap-x-[21px] gap-y-3">
            {group.members.length > 0 ? (
              group.members.map(({ avatarImg, id, userName }, index) => (
                <li
                  key={id}
                  className="flex-center relative bg-white-600 size-10 rounded-full"
                >
                  <Image
                    src={avatarImg || '/assets/images/avatars/avatar-1.svg'}
                    width={28}
                    height={34}
                    alt={userName}
                    className="rounded-full"
                  />
                  {index === group.members.length - 1 && (
                    <div className="absolute flex-center bg-[#0A182D] z-10 size-full opacity-70 inset-0 rounded-full">
                      <span className="cap-10 cursor-default !text-white-100 !text-sm">
                        {group._count.members}+
                      </span>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="p3-medium">No members in the group yet</li>
            )}
          </ul>
        </div>
        <div className="right-sidebar-item">
          <div className="flex-between">
            <p className="p2-bold">Group Admins</p>
            <GroupAdminsDialog groupId={group.id} />
          </div>
          <ul className="flex flex-col gap-2.5">
            {membersCount.admins > 0 ? (
              group.members?.map(({ avatarImg, id, role, userName }) =>
                role === EUserRole.ADMIN ? (
                  <li key={id} className="flex items-center gap-1.5">
                    <div className="flex-center bg-white-600 size-[30px] rounded-full shrink-0">
                      <Image
                        src={avatarImg || '/assets/images/avatars/avatar-1.svg'}
                        width={22}
                        height={28}
                        alt={userName}
                        className="rounded-full"
                      />
                    </div>
                    <span className="p3-medium !text-black-700 dark:!text-white-300">
                      {userName}
                    </span>
                  </li>
                ) : null
              )
            ) : (
              <li className="p3-medium">No admins in the group yet</li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default GroupDetails;
