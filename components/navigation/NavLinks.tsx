'use client';

import CalendarIcon from '../icons/Calendar';
import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import PlusIcon from '../icons/Plus';
import PodcastIcon from '../icons/Podcast';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------

enum EPage {
  CONTENT = 'content',
  POSTS = 'posts',
  MEETUPS = 'meetups',
  PODCASTS = 'podcasts',
  GROUPS = 'groups',
  CREATE = 'create',
}

const verifyRoute = (page: EPage, pathname: string) => {
  switch (page) {
    case EPage.CONTENT:
      return (
        (pathname.includes('/content') || pathname.includes('/posts')) &&
        !pathname.includes('/create') &&
        !pathname.includes('/edit')
      );
    case EPage.MEETUPS:
      return (
        pathname.includes('/meetups') &&
        !pathname.includes('/create') &&
        !pathname.includes('/edit')
      );
    case EPage.PODCASTS:
      return (
        pathname.includes('/podcasts') &&
        !pathname.includes('/create') &&
        !pathname.includes('/edit')
      );
    case EPage.GROUPS:
      return (
        pathname.includes('/groups') &&
        !pathname.includes('/create') &&
        !pathname.includes('/edit')
      );
    case EPage.CREATE:
      return pathname.includes('/create') || pathname.includes('/edit');
    default:
      return false;
  }
};

const PAGES = [
  { href: '/posts', icon: FrameIcon, page: EPage.CONTENT },
  { href: '/meetups', icon: CalendarIcon, page: EPage.MEETUPS },
  { href: '/podcasts', icon: PodcastIcon, page: EPage.PODCASTS },
  { href: '/groups', icon: GroupsIcon, page: EPage.GROUPS },
  { href: '/content/create', icon: PlusIcon, page: EPage.CREATE },
];

const NavLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5">
      {PAGES.map(({ href, icon: Icon, page }) => {
        const isActive = verifyRoute(page, pathname);
        return (
          <Link
            key={page}
            href={href}
            className={`group rounded-[7px] p-2.5 ${isActive ? 'bg-primary-500' : ''} transition-colors hover:bg-white-300 dark:hover:bg-white-400`}
          >
            <Icon
              className={`icon-light400__dark300 ${isActive ? '!text-white-100 dark:!text-white-100' : ''} transition-colors group-hover:dark:text-white-100`}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
