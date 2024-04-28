'use client';

import { useTheme } from '@/app/context/ThemeProvider';

import { signOut } from 'next-auth/react';
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
import Image from 'next/image';

// ----------------------------------------------------------------

/**
 * 1. Dark   (active -- text-white-200 bg-dark-700 rounded-full)  regular text-dark-700
 * 2. Light  (active -- text-dark-700  bg-primary-100  rounded-full)  regular text-white-300
 */

interface IProfileMenuProps {}

const ProfileMenu: React.FC<IProfileMenuProps> = (props) => {
  const { setMode, mode } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 ">
        <div className="relative w-[26px] h-[26px] lg:w-[34px] lg:h-[34px]">
          <Image
            src="/assets/images/no-image.svg"
            alt="avatar"
            fill
            className="ring-primary-500 ring-[1px] ring-offset-[3px] ring-offset-white-100 dark:ring-offset-black-800 rounded-lg "
          />
        </div>
        <span className="paragraph-2-medium max-md:hidden">Uros Bijelic</span>
        <ArrowDownIcon className="icon-white-400__dark-white-300 max-md:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-header-menu">
        <DropdownMenuItem className="paragraph-3-medium">
          <Button className="p-0 gap-2.5 h-auto">
            <ProfileIcon className="" />
            Profile
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="paragraph-3-medium gap-2.5">
          <Button
            className="p-0 gap-2.5 h-auto text-primary-500"
            onClick={() => signOut()}
          >
            <LogoutIcon />
            Logout
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-5 p-[3px] bg-primary-200 dark:bg-black-800 rounded-[15px] font-semibold text-black-800 dark:text-white-200 text-base">
          Interface
          <div className="flex gap-2.5">
            <Button
              className="p-1 bg-primary-100 dark:bg-black-800 dark:p-0 rounded-full h-auto"
              onClick={() => setMode('light')}
            >
              <SunIcon className="text-black-700 dark:text-black-700" />
            </Button>
            <Button
              className="p-0 bg-white-200 dark:p-1 dark:bg-black-700 rounded-full h-auto"
              onClick={() => setMode('dark')}
            >
              <MoonIcon className="text-white-300 dark:text-dark-700" />
            </Button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
