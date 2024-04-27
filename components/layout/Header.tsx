'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import HeaderMenu from './HeaderMenu';
import FrameIcon from '../icons/Frame';
import CalendarIcon from '../icons/Calendar';
import PodcastIcon from '../icons/Podcast';
import GroupsIcon from '../icons/Groups';
import SearchIcon from '../icons/Search';
import NotificationIcon from '../icons/Notification';
import PlusIcon from '../icons/Plus';
import { useTheme } from '@/app/context/ThemeProvider';

// ----------------------------------------------------------------

interface IHeaderProps {}

/**
 * LIGHT MODE
 *     - text-white-400
 * DARK MODE
 *     - text-white-300
 */

const Header: React.FC<IHeaderProps> = (props) => {
  const pathname = usePathname();
  const { mode } = useTheme();

  const logoUrl =
    mode === 'dark'
      ? '/assets/images/logo-dark.svg'
      : '/assets/images/logo-light.svg';

  return (
    <header className="bg-white-100__dark-black-800 flex justify-between items-center py-5 px-8 w-full fixed z-50">
      <Image src={logoUrl} width={147} height={30} alt="Logo" />
      <div className="flex gap-5 border border-red-200">
        <Link href="/posts" className="p-2.5 icon-white-400__dark-white-300">
          <FrameIcon className="" />
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
      </div>
      <div className="flex items-center gap-[18px] ">
        <div className="p-2.5">
          <SearchIcon className="icon-white-400__dark-white-300" />
        </div>
        <div className="p-2.5 ">
          <NotificationIcon className="icon-white-400__dark-white-300" />
        </div>
        <div className="p-2.5">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
