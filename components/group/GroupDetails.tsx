import type { IDetailsPageGroup, IGroup } from '@/types/group';
import { EQueryType } from '@/types/queries';
import Image from 'next/image';
import Link from 'next/link';
import LogoutSecondIcon from '../icons/LogoutSecond';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import { Button } from '../ui/button';
import GroupContentWrapper from './GroupContentWrapper';
import GroupDropdownMenu from './GroupDropdownMenu';

// ----------------------------------------------------------------

interface IGroupDetailsProps {
  group: IDetailsPageGroup;
  topRankedGroups: IGroup[] | undefined;
  contentType: EQueryType;
}

const GroupDetails: React.FC<IGroupDetailsProps> = ({
  group,
  contentType,
  topRankedGroups,
}) => {
  console.log('GROUP COVER IMAGE', group.coverImage);

  const isGroupMemeber = true;

  // TODO: finish when we merge crate group feature
  // let transformedProfileImage = group.profileImage;
  // if (transformedProfileImage.startsWith(CLOUDINARY_URL)) {

  // }

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
                <span className="p3-medium !text-primary-500">300</span> Posts
              </p>
            </li>
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">2831</span>{' '}
                Members
              </p>
            </li>
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">43</span> Admins
              </p>
            </li>
          </ul>
        </div>
        <div className="max-md:hidden">
          <SidebarItemWrapper title="Top Ranked" items={[]} />
        </div>
      </aside>
      <main className="main-content gap-5  mx-auto">
        <div className="flex flex-col gap-2.5 bg-light100__dark800 py-4 px-2.5 md:py-2.5 rounded-2xl shadow-card">
          <div
            className={`relative w-full h-24 md:h-44 ${!group.coverImage ? 'flex-center bg-black-700 rounded-[10px]' : ''}`}
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
                  <span className="text-white-400">Created by</span> UROS
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="max-md:hidden">
                <JoinOrLeaveGroupBtn isGroupMemeber={isGroupMemeber} />
              </div>
              <GroupDropdownMenu groupId={group.id} />
            </div>
          </div>
          <div className="md:hidden">
            <JoinOrLeaveGroupBtn isGroupMemeber={isGroupMemeber} />
          </div>
        </div>
        <GroupContentWrapper contentType={contentType} />
      </main>
      <aside className="right-sidebar">
        <div className="right-sidebar-item">HERE LATEST MEETUPS ADD</div>
        <div className="right-sidebar-item">
          <div className="flex-between">
            <p className="p2-bold">Active Members</p>
            <Link href="/" className="p4-regular">
              View All
            </Link>
          </div>
          {/* <ul className="flex flex-wrap gap-x-[21px] gap-y-3">
            {Array.from({ length: 10 }).map(() => (
              <li className="flex-center bg-white-600 size-10 rounded-full">
                <Image
                  src="/assets/images/avatars/avatar-1.svg"
                  width={28}
                  height={34}
                  alt="USER NAME FOR EXAMPLE?!?!?!"
                />
              </li>
            ))}
          </ul> */}
        </div>
        <div className="right-sidebar-item">
          <div className="flex-between">
            <p className="p2-bold">Group Admins</p>
            <Link href="/" className="p4-regular">
              View All
            </Link>
          </div>
          <ul className="flex flex-col gap-2.5">
            <li className="flex-between">
              <div className="flex items-center gap-1.5">
                <div className="flex-center bg-white-600 size-[30px] rounded-full shrink-0">
                  <Image
                    src="/assets/images/avatars/avatar-1.svg"
                    width={22}
                    height={28}
                    alt="USER NAME FOR EXAMPLE?!?!?!"
                  />
                </div>
                <span className="p3-medium !text-black-700 dark:!text-white-300">
                  Adrian Hajdin
                </span>
              </div>
              <Button className="w-auto">
                <Image
                  src="/assets/icons/add-user.svg"
                  width={18}
                  height={18}
                  alt="Add"
                />
              </Button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

const JoinOrLeaveGroupBtn = ({
  isGroupMemeber,
}: {
  isGroupMemeber: boolean;
}) => {
  return (
    <Button
      size="small"
      className={`px-4 gap-1 icon-light400__dark300 ${isGroupMemeber ? 'bg-white-200 dark:bg-black-700' : 'bg-primary-500'}`}
    >
      {isGroupMemeber ? (
        <>
          <LogoutSecondIcon />
          Leave Group
        </>
      ) : (
        'Join group'
      )}
    </Button>
  );
};

export default GroupDetails;
