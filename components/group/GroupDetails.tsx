import { IGroup } from '@/types/group';
import Image from 'next/image';
import LogoutSecondIcon from '../icons/LogoutSecond';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import { Button } from '../ui/button';
import GroupDropdownMenu from './GroupDropdownMenu';

// ----------------------------------------------------------------

interface IGroupDetailsProps {
  group: IGroup;
}

const GroupDetails: React.FC<IGroupDetailsProps> = ({ group }) => {
  console.log('group GROUP DETAIL PAGE', group);

  const isGroupMemeber = true;

  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <div className="left-sidebar-item gap-3">
          <p className="p2-bold">About Group</p>
          <p className="p4-regular">
            Master Modern Web Dev With a Project Based Approach. Gain real-world
            experience and land that dream dev job sooner. Dive into a
            collaborative learning environment where practical application meets
            cutting-edge technologies, propelling you towards success
          </p>
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
      <main className="main-content mx-auto">
        <div className="flex flex-col gap-2.5 bg-light100__dark800 py-4 px-2.5 md:py-2.5 rounded-2xl">
          <div className="relative w-full h-24 md:h-44">
            <Image
              fill
              src="/assets/icons/image-preview.svg"
              alt={group.name}
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
          <div className="flex-between gap-2.5 md:px-2.5">
            <div className="flex items-center gap-3.5 md:gap-5">
              <div className="relative size-14 md:size-[70px]">
                {group.coverImage ? (
                  <Image
                    fill
                    src={group.coverImage}
                    alt={group.name}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    width={40}
                    height={40}
                    src="/assets/icons/image-preview.svg"
                    alt={group.name}
                  />
                )}
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
      </main>
      <aside className="right-sidebar border">RIGHT SIDEBAR</aside>
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
      className={`px-4 gap-1 icon-light400__dark300 ${isGroupMemeber ? 'bg-black-700' : 'bg-primary-500'}`}
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
