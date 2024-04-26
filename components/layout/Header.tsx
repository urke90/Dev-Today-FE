import Image from 'next/image';

import HeaderMenu from './HeaderMenu';
import FrameIcon from '../icons/Frame';
import CalendarIcon from '../icons/Calendar';
import PodcastIcon from '../icons/Podcast';
import GroupsIcon from '../icons/Groups';
import SearchIcon from '../icons/Search';
import NotificationIcon from '../icons/Notification';
import PlusIcon from '../icons/Plus';

// ----------------------------------------------------------------

interface IHeaderProps {}

/**
 * LIGHT MODE
 *     - text-white-400
 * DARK MODE
 *     - text-white-300
 */

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header className="bg-white-100__dark-800 flex justify-between items-center py-5 px-8">
      <Image
        src="/assets/images/logo-light.svg"
        width={147}
        height={30}
        alt="Logo"
      />
      <div className="flex gap-5 border border-red-200">
        <div className="p-2.5 bg-primary-500 rounded-[10px]">
          <FrameIcon className="" />
        </div>
        <div className="p-2.5">
          <CalendarIcon />
        </div>
        <div className="p-2.5">
          <PodcastIcon />
        </div>
        <div className="p-2.5">
          <GroupsIcon />
        </div>
        <div className="p-2.5">
          <PlusIcon />
        </div>
      </div>
      <div className="flex items-center gap-[18px] border border-blue-200">
        <div className="p-2.5">
          <SearchIcon />
        </div>
        <div className="p-2.5">
          <NotificationIcon />
        </div>
        <div className="p-2.5">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
