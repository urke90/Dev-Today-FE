'use client';

import ArrowDownIcon from '../icons/ArrowDown';
import { Button } from '../ui/button';
import ProfileIcon from '../icons/Profile';
import LogoutIcon from '../icons/Logout';
import MoonIcon from '../icons/Moon';
import SunIcon from '../icons/Sun';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Separator,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { useTheme } from '@/context/ThemeProvider';

interface IProfileMenuProps {}

// ? shadcn command dialog  cmdk lib

const ProfileMenu: React.FC<IProfileMenuProps> = (props) => {
  const { setMode } = useTheme();
  return (
    <DropdownMenu>
      <Trigger className="flex items-center gap-2" asChild>
        <Button className="w-auto">
          <div className="relative size-[26px] lg:size-[34px]">
            <Image
              src="/assets/images/no-image.svg"
              alt="avatar"
              fill
              className="rounded-lg ring-1 ring-primary-500 ring-offset-[3px] ring-offset-white-100 dark:ring-offset-black-800"
            />
          </div>
          <span className="p2-medium max-md:hidden">Uros Bijelic</span>
          <ArrowDownIcon className="icon-light400__dark300 max-md:hidden" />
        </Button>
      </Trigger>
      <Portal>
        <Content
          collisionPadding={10}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="bg-light100__dark800 shadow-header-menu z-20 mt-7 flex min-w-44 flex-col gap-5 rounded-[14px] border border-white-border p-5 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade dark:border-black-700 max-lg:mt-6"
        >
          <Item className="p3-medium">
            <Button className="justify-start gap-2.5">
              <ProfileIcon />
              Profile
            </Button>
          </Item>
          <Item className="p3-medium gap-2.5">
            <Button
              className="justify-start gap-2.5 text-primary-500"
              onClick={() => signOut()}
            >
              <LogoutIcon />
              Logout
            </Button>
          </Item>
          <Separator className="h-px bg-white-border" />
          <Item className="bg-primary-200 flex gap-5 rounded-[15px] p-[3px] text-base font-semibold text-black-800 dark:bg-black-800 dark:text-white-200">
            Interface
            <div className="flex gap-2.5">
              <Button
                className="size-[24px] rounded-full bg-primary-100 dark:bg-black-800"
                onClick={() => setMode('light')}
              >
                <SunIcon className="text-black-700" />
              </Button>
              <Button
                className="size-[24px] rounded-full bg-white-200 dark:bg-black-700"
                onClick={() => setMode('dark')}
              >
                <MoonIcon className="dark:text-dark-700 text-white-300" />
              </Button>
            </div>
          </Item>
        </Content>
      </Portal>
    </DropdownMenu>
  );
};

export default ProfileMenu;
