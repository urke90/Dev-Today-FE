'use client';

import ProfileMenu from './ProfileMenu';
import NotificationMenu from './NotificationMenu';
import SearchCommandDialog from './SearchCommandDialog';

// ----------------------------------------------------------------

interface INavMenuProps {}

const NavMenu: React.FC<INavMenuProps> = () => {
  return (
    <div className="relative z-50 flex items-center gap-[18px]">
      <SearchCommandDialog />
      <NotificationMenu />
      <ProfileMenu />
    </div>
  );
};

export default NavMenu;
