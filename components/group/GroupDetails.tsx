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
import { Button } from '../ui/button';
import GroupContentWrapper from './GroupContentWrapper';
import GroupDropdownMenu from './GroupDropdownMenu';
import JoinOrLeaveGroupButton from './JoinOrLeaveGroupButton';

// ----------------------------------------------------------------

/**
 * TODO: simple server action func just for revalidatePath fron next/cache
 * TODO:  move function for POST/PATCH to mutations.ts file
 */

interface IGroupDetailsProps {
  group: IDetailsPageGroup;
  topRankedGroups: IGroupWithCount[] | undefined;
  contentType: EQueryType;
  isGroupOwner: boolean;
  isGroupAdmin: boolean;
  isGroupUser: boolean;
  groupContent: IGroupContentResponse;
  groupMembers: IGroupMembersResponse;
  userId: string;
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
  userId,
}) => {
  const isGroupMemeber = !isGroupOwner && (isGroupUser || isGroupAdmin);
  let totalUsers = { members: 0, admins: 0 };

  console.log('isGroupMember', isGroupMemeber);

  group.members.forEach((member) => {
    member.role === EUserRole.USER ? totalUsers.members++ : totalUsers.admins++;
  });

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
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">
                  {group._count.contents}
                </span>{' '}
                Posts
              </p>
            </li>
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">
                  {totalUsers.members}
                </span>{' '}
                Members
              </p>
            </li>
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">
                  {totalUsers.admins}
                </span>{' '}
                Admins
              </p>
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
                    userId={userId}
                    groupId={group.id}
                    isGroupMemeber={isGroupMemeber}
                  />
                )}
              </div>
              <GroupDropdownMenu groupId={group.id} />
            </div>
          </div>
          <div className="md:hidden">
            {!isGroupOwner && (
              <JoinOrLeaveGroupButton
                userId={userId}
                groupId={group.id}
                isGroupMemeber={isGroupMemeber}
              />
            )}
          </div>
        </div>
        <GroupContentWrapper
          contentType={contentType}
          groupContent={groupContent}
          groupMembers={groupMembers}
          userId={userId}
          groupId={group.id}
        />
      </main>
      <aside className="right-sidebar">
        <SidebarContentCard title="Meetups" items={group.contents} />
        <div className="right-sidebar-item">
          <div className="flex-between">
            <p className="p2-bold">Active Members</p>
            {/* <MembersDialog members={group.members.filter((member) => member.role === EUserRole.USER)} /> */}
          </div>
          <ul className="flex flex-wrap gap-x-[21px] gap-y-3">
            {group.members.map(({ avatarImg, id, userName }, index) => (
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
            ))}
          </ul>
        </div>
        <div className="right-sidebar-item">
          <div className="flex-between">
            <p className="p2-bold">Group Admins</p>
            <Button className="w-auto p4-regular">View All</Button>
          </div>
          <ul className="flex flex-col gap-2.5">
            {group.members?.map(({ avatarImg, id, role, userName }) =>
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
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default GroupDetails;
