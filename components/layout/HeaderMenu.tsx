'use client';

import { useTheme } from '@/app/context/ThemeProvider';

import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MoonIcon from '../icons/Moon';
import SunIcon from '../icons/Sun';

import { Button } from '../ui/button';
import NotificationIcon from '../icons/Notification';
import ArrowDownIcon from '../icons/ArrowDown';
import ProfileIcon from '../icons/Profile';
import LogoutIcon from '../icons/Logout';

// ----------------------------------------------------------------

/**
 * 1. Dark   (active -- text-white-200 bg-dark-700 rounded-full)  regular text-dark-700
 * 2. Light  (active -- text-dark-700  bg-primary-100  rounded-full)  regular text-white-300
 */

interface IHeaderMenuProps {}

const HeaderMenu: React.FC<IHeaderMenuProps> = (props) => {
  const { setMode, mode } = useTheme();

  const iconStyles = '';
  // const activeMode;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <NotificationIcon />
        <span className="paragraph-2-medium">Uros Bijelic</span>
        <ArrowDownIcon className="icon-white-400__dark-white-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="paragraph-3-medium gap-2.5">
          <ProfileIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="paragraph-3-medium gap-2.5">
          <LogoutIcon />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-5 p-[3px] bg-primary-200 dark:bg-black-800 rounded-[15px] font-semibold text-black-800 dark:text-white-200 text-base">
          Interface
          <div className="flex gap-2.5">
            <Button
              className="p-1 bg-primary-100 dark:bg-black-800 dark:p-0 rounded-full h-auto"
              onClick={() => setMode('light')}
            >
              <SunIcon className={`text-black-700  dark:text-dark-700`} />
            </Button>
            <Button
              className="p-0 bg-white-200 dark:p-1 dark:bg-black-700 rounded-full h-auto"
              onClick={() => setMode('dark')}
            >
              <MoonIcon className={`text-white-300 dark:text-dark-700`} />
            </Button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
