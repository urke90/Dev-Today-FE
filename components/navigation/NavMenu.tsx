'use client';

import ProfileMenu from './ProfileMenu';
import SearchCommandDialog from './SearchCommandDialog';

// ----------------------------------------------------------------

const NavMenu: React.FC = () => {
  return (
    <div className="relative z-50 flex items-center gap-[18px]">
      <SearchCommandDialog />
      {/* <NotificationMenu /> */}
      <ProfileMenu />
    </div>
  );
};

export default NavMenu;
