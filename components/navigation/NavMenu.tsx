'use client';

import ProfileMenu from './ProfileMenu';
import NotificationMenu from './NotificationMenu';
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
