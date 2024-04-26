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

// ----------------------------------------------------------------

/**
 * 1. Dark
 * 2. Light
 */

interface IHeaderMenuProps {}

const HeaderMenu: React.FC<IHeaderMenuProps> = (props) => {
  const { setMode, mode } = useTheme();

  const imgDarkModeStyles = `text-black-700 ${
    mode === 'dark' ? 'text-white-200 p-1 bg-black-700' : ''
  }`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <NotificationIcon />
        <span className="paragraph-2-medium">Uros Bijelic</span>
        <ArrowDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="paragraph-3-medium gap-2.5">
          <Image
            src="/assets/icons/profile.svg"
            width={12}
            height={8}
            alt="profile"
          />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="paragraph-3-medium gap-2.5">
          <Image
            src="/assets/icons/logout.svg"
            width={12}
            height={8}
            alt="logout"
          />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-5 font-semibold text-black-800 dark:text-white-200 text-base">
          Interface
          <Button className="p-0" onClick={() => setMode('light')}>
            <SunIcon />
          </Button>
          <Button className="p-0" onClick={() => setMode('dark')}>
            <MoonIcon className="text-red-400" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
