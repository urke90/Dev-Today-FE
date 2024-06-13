'use client';

import { fetchAllGroups } from '@/api/queries';
import { EAllContentGroupQueries } from '@/constants/react-query';
import { IContent } from '@/types/content';
import { IAllGroupsResponse } from '@/types/group';
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

interface IGroupHomeProps {
  groupsData: IAllGroupsResponse;
  userId: string;
  postItems: IContent[];
  meetupItems: IContent[];
  podcastItems: IContent[];
}

const items = [
  {
    id: '1',
    title: 'Understanding JavaScript Closures',
    imageUrl: '/assets/icons/image-preview.svg',
    description:
      'A deep dive into JavaScript closures, how they work, and their use cases in modern JavaScript development.',
  },
  {
    id: '2',
    title: 'Mastering Async/Await in Node.js',
    imageUrl: '/assets/icons/image-upload.svg',
    description:
      'Learn how to effectively use async/await in Node.js for handling asynchronous operations with ease and better readability.',
  },
  {
    id: '3',
    title: 'React Hooks: The Complete Guide',
    imageUrl: '/assets/icons/image-preview.svg',
    description:
      'An in-depth guide to React Hooks, including useState, useEffect, and custom hooks for better state and side effect management.',
  },
  {
    id: '4',
    title: 'Building RESTful APIs with Express',
    imageUrl: '/assets/icons/image-upload.svg',
    description:
      'A comprehensive tutorial on building RESTful APIs using Express.js, covering routing, middleware, and best practices.',
  },
  {
    id: '5',
    title: 'Exploring GraphQL: A Better Way to Query APIs',
    imageUrl: '',
    description:
      'Discover the advantages of GraphQL over REST, and learn how to set up and use GraphQL in your applications.',
  },
];

const GroupHome: React.FC<IGroupHomeProps> = ({
  groupsData,
  userId,
  postItems,
  meetupItems,
  podcastItems,
}) => {
  const [page, setPage] = useState(1);

  const { data } = useQuery<IAllGroupsResponse>({
    queryKey: [EAllContentGroupQueries.FETCH_ALL_GROUPS, page],
    queryFn: () => fetchAllGroups(page),
    retry: false,
    enabled: page > 1,
    initialData: groupsData,
  });

  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <SortAndFilter isGroupPage />
        <SidebarItemWrapper
          title="Top Ranked"
          items={items.map(({ id, imageUrl, title, description }) => (
            <SidebarGroupItem
              key={id}
              id={id}
              description={description}
              title={title}
              imageUrl={imageUrl}
            />
          ))}
        />
        <SidebarItemWrapper
          title="Active Groups"
          items={items.map(({ id, imageUrl, title, description }) => (
            <SidebarGroupItem
              key={id}
              id={id}
              description={description}
              title={title}
              imageUrl={imageUrl}
            />
          ))}
        />
      </aside>
      <main className="main-content mx-auto">
        <div className="flex-between mb-5">
          <h2 className="d2-bold">All Groups</h2>
          <Button variant="primary" size="small" className="w-auto">
            <Link href="groups/create">Create a new group</Link>
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-y-3.5 gap-x-5 mb-5 md:mb-10">
          {data.groups?.length > 0 &&
            data.groups.map(({ id, coverImage, bio, name, members }) => (
              <GroupItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                description={bio}
                title={name}
                members={members}
              />
            ))}
        </ul>
        <Pagination
          currentPage={page}
          totalPage={data.totalPages}
          setPage={setPage}
          disableNextBtn={!data.hasNextPage}
          disablePrevBtn={page === 1}
        />
      </main>
      <aside className="right-sidebar border">
        <SidebarContentCard title="Meetups" items={meetupItems} />
        <SidebarContentCard title="Podcasts" items={podcastItems} />
        <SidebarContentCard title="Posts" items={postItems} />
      </aside>
    </div>
  );
};

export default GroupHome;
