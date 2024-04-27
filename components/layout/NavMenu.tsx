'use client';

import NotificationIcon from '../icons/Notification';
import SearchIcon from '../icons/Search';
import ProfileMenu from './ProfileMenu';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface INavMenuProps {}

const NavMenu: React.FC<INavMenuProps> = () => {
  return (
    <div className="flex items-center gap-[18px]">
      <Button className="p-2.5 bg-white-200 dark:bg-black-700">
        <SearchIcon className="icon-white-400__dark-white-300" />
      </Button>
      <Button className="p-2.5 bg-white-200 dark:bg-black-700">
        <NotificationIcon className="icon-white-400__dark-white-300" />
      </Button>
      <div className="p-2.5">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default NavMenu;
