'use client';

import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import CalendarIcon from '../icons/Calendar';
import PodcastIcon from '../icons/Podcast';
import PlusIcon from '../icons/Plus';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// ----------------------------------------------------------------

interface IFooterProps {}

const NavLinks: React.FC<IFooterProps> = (props) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5">
      <Link href="/posts" className="icon-light400__dark300 p-2.5">
        <FrameIcon />
      </Link>
      <Link href="/meetup" className="icon-light400__dark300 p-2.5">
        <CalendarIcon />
      </Link>
      <Link href="/podcast" className="icon-light400__dark300 p-2.5">
        <PodcastIcon />
      </Link>
      <Link href="/groups" className="icon-light400__dark300 p-2.5">
        <GroupsIcon />
      </Link>
      <Link href="#" className="icon-light400__dark300 p-2.5">
        <PlusIcon />
      </Link>
    </nav>
  );
};

export default NavLinks;
