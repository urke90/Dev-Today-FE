'use client';

import ArrowDownIcon from '../icons/ArrowDown';
import LogoutIcon from '../icons/Logout';
import MoonIcon from '../icons/Moon';
import ProfileIcon from '../icons/Profile';
import SunIcon from '../icons/Sun';
import { Button } from '../ui/button';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Separator,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

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
              className="ring-primary-500 ring-offset-white-100 dark:ring-offset-black-800 rounded-lg ring-1 ring-offset-[3px] bg-primary-100 dark:bg-primary-500"
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
          className="bg-light100__dark800 shadow-header-menu border-white-border data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade dark:border-black-700 z-20 mt-7 flex min-w-44 flex-col gap-5 rounded-[14px] border p-5 max-lg:mt-6"
        >
          <Item className="p3-medium">
            <Button className="justify-start gap-2.5">
              <ProfileIcon />
              Profile
            </Button>
          </Item>
          <Item className="p3-medium gap-2.5">
            <Button
              className="text-primary-500 justify-start gap-2.5"
              onClick={() => signOut()}
            >
              <LogoutIcon />
              Logout
            </Button>
          </Item>
          <Separator className="bg-white-border h-px" />
          <Item className="bg-primary-200 text-black-800 dark:bg-black-800 dark:text-white-200 flex gap-5 rounded-[15px] p-[3px] text-base font-semibold">
            Interface
            <div className="flex gap-2.5">
              <Button
                className="bg-primary-100 dark:bg-black-800 size-[24px] rounded-full"
                onClick={() => setMode('light')}
              >
                <SunIcon className="text-black-700" />
              </Button>
              <Button
                className="bg-white-200 dark:bg-black-700 size-[24px] rounded-full"
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
