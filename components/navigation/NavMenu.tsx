import { auth } from '@/app/api/auth/[...nextauth]/route';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import SearchCommandDialog from './SearchCommandDialog';

// ----------------------------------------------------------------

interface INavMenuProps {}

const NavMenu: React.FC<INavMenuProps> = async () => {
  const session = await auth();
  const userName = session?.user?.name;
  console.log(userName);

  return (
    <div className="relative z-50 flex items-center gap-[18px]">
      <SearchCommandDialog />
      <NotificationMenu />
      <ProfileMenu userName={userName} />
    </div>
  );
};

export default NavMenu;
