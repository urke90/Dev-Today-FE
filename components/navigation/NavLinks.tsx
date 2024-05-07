'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import CalendarIcon from '../icons/Calendar';
import PodcastIcon from '../icons/Podcast';
import PlusIcon from '../icons/Plus';

// ----------------------------------------------------------------

interface IFooterProps {}

const NavLinks: React.FC<IFooterProps> = (props) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5">
      <Link href="/posts" className="p-2.5 icon-white-400__dark-white-300">
        <FrameIcon />
      </Link>
      <Link href="/meetup" className="p-2.5 icon-white-400__dark-white-300">
        <CalendarIcon />
      </Link>
      <Link href="/podcast" className="p-2.5 icon-white-400__dark-white-300">
        <PodcastIcon />
      </Link>
      <Link href="/groups" className="p-2.5 icon-white-400__dark-white-300">
        <GroupsIcon />
      </Link>
      <Link href="#" className="p-2.5 icon-white-400__dark-white-300">
        <PlusIcon />
      </Link>
    </nav>
  );
};

export default NavLinks;