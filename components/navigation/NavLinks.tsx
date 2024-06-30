'use client';

import CalendarIcon from '../icons/Calendar';
import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import PlusIcon from '../icons/Plus';
import PodcastIcon from '../icons/Podcast';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------

const NavLinks: React.FC = () => {
  const pathname = usePathname();

  const contentPageClass =
    (pathname.includes('/content') || pathname.includes('/posts')) &&
    !pathname.includes('/create')
      ? 'bg-primary-500'
      : '';
  const meetupsPageClass =
    pathname.includes('/meetups') && !pathname.includes('/create')
      ? 'bg-primary-500'
      : '';
  const podcastsPageClass =
    pathname.includes('/podcasts') && !pathname.includes('/create')
      ? 'bg-primary-500'
      : '';
  const groupsPageClass =
    pathname.includes('/groups') && !pathname.includes('/create')
      ? 'bg-primary-500'
      : '';
  // const postsPageClass =  && !pathname.includes('/create') ? 'bg-primary-500' : '';

  return (
    <nav className="flex gap-5">
      <Link href="/posts" className={`p-2.5 rounded-[7px] ${contentPageClass}`}>
        <FrameIcon className="icon-light400__dark300" />
      </Link>
      <Link
        href="/meetups"
        className={`p-2.5 rounded-[7px] ${meetupsPageClass}`}
      >
        <CalendarIcon className="icon-light400__dark300" />
      </Link>
      <Link
        href="/podcasts"
        className={`p-2.5 rounded-[7px] ${podcastsPageClass}`}
      >
        <PodcastIcon className="icon-light400__dark300" />
      </Link>
      <Link href="/groups" className={`p-2.5 rounded-[7px] ${groupsPageClass}`}>
        <GroupsIcon className="icon-light400__dark300" />
      </Link>
      <Link
        href="#"
        className={`p-2.5 rounded-[7px] ${pathname.includes('/create') ? 'bg-primary-500' : ''}`}
      >
        <PlusIcon className="icon-light400__dark300" />
      </Link>
    </nav>
  );
};

export default NavLinks;
