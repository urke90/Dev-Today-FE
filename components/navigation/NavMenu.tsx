'use client';

import SearchIcon from '../icons/Search';
import ProfileMenu from './ProfileMenu';
import NotificationMenu from './NotificationMenu';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface INavMenuProps {}

const NavMenu: React.FC<INavMenuProps> = () => {
  return (
    <div className="flex items-center gap-[18px] relative z-50">
      <Button className="p-1.5 lg:p-2.5 bg-white-200 dark:bg-black-700 h-auto">
        <SearchIcon className="icon-white-400__dark-white-300" />
      </Button>
      <NotificationMenu />
      <ProfileMenu />
    </div>
  );
};

export default NavMenu;
