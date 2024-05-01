'use client';

import SearchIcon from '../icons/Search';
import ProfileMenu from './ProfileMenu';
import NotificationMenu from './NotificationMenu';
import { Button } from '../ui/button';
import SearchCommandDialog from './SearchCommandDialog';

// ----------------------------------------------------------------

interface INavMenuProps {}

const NavMenu: React.FC<INavMenuProps> = () => {
  return (
    <div className="flex items-center gap-[18px] relative z-50">
      <SearchCommandDialog />
      <NotificationMenu />
      <ProfileMenu />
    </div>
  );
};

export default NavMenu;
