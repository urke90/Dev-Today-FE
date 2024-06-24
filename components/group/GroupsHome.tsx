'use client';

import { fetchAllGroups } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import type {
  IAllGroupsSidebarDetails,
  IHomePageGroupsResponse,
} from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import GroupItemCard from '../shared/GroupItemCard';
import SidebarGroupItem from '../shared/LeftSidebarItems/SidebarGroupItem';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import Pagination from '../shared/Pagination';
import SidebarContentCard from '../shared/RightSidebarItems/SidebarContentCard';
import SortAndFilter from '../shared/SortAndFilter';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface IGroupsHomeProps {
  groupsData: IHomePageGroupsResponse;
  sidebarDetails: IAllGroupsSidebarDetails;
}

const GroupsHome: React.FC<IGroupsHomeProps> = ({
  groupsData,
  sidebarDetails,
}) => {
  const [page, setPage] = useState(1);

  const { data } = useQuery<IHomePageGroupsResponse>({
    queryKey: [EContentGroupQueries.FETCH_GROUPS, page],
    queryFn: () => fetchAllGroups(page),
    retry: false,
    enabled: page > 1,
    initialData: groupsData,
  });

  return (
    <section className="px-3.5 lg:px-5">
      <div className="content-wrapper">
        <aside className="left-sidebar">
          <SortAndFilter isGroupPage />
          <SidebarItemWrapper
            title="Top Ranked"
            items={sidebarDetails.topRankedGroups.map(
              ({ id, profileImage, name, _count }) => (
                <SidebarGroupItem
                  key={id}
                  id={id}
                  name={name}
                  profileImage={profileImage}
                  totalItems={_count.contents}
                />
              )
            )}
          />
          <SidebarItemWrapper
            title="Active Groups"
            items={sidebarDetails.topActiveGroups.map(
              ({ id, profileImage, name, _count }) => (
                <SidebarGroupItem
                  key={id}
                  id={id}
                  name={name}
                  profileImage={profileImage}
                  totalItems={_count.members}
                />
              )
            )}
          />
        </aside>
        <main className="main-content mx-auto">
          <div className="flex-between mb-5">
            <h2 className="d2-bold">All Groups</h2>
            <Button variant="primary" size="small" className="w-auto px-3.5">
              <Link href="groups/create">Create a new group</Link>
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-y-3.5 gap-x-5 mb-5 md:mb-10">
            {data.groups?.length > 0 &&
              data.groups.map(
                ({ id, coverImage, bio, name, members, _count }) => (
                  <GroupItemCard
                    key={id}
                    id={id}
                    coverImage={coverImage}
                    description={bio}
                    title={name}
                    members={members.map((member) => member.user)}
                    totalMembers={_count.members}
                  />
                )
              )}
          </ul>
          <Pagination
            currentPage={page}
            totalPage={data.totalPages}
            setPage={setPage}
            disableNextBtn={!data.hasNextPage}
            disablePrevBtn={page === 1}
          />
        </main>
        <aside className="right-sidebar">
          <SidebarContentCard title="Meetups" items={sidebarDetails.meetups} />
          <SidebarContentCard
            title="Podcasts"
            items={sidebarDetails.podcasts}
          />
          <SidebarContentCard title="Posts" items={sidebarDetails.posts} />
        </aside>
      </div>
    </section>
  );
};

export default GroupsHome;
