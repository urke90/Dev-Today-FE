'use client';

import Image from 'next/image';
import {
  DropdownMenu,
  Content,
  Trigger,
  Item,
  Separator,
  Portal,
} from '@radix-ui/react-dropdown-menu';
import ArrowDownIcon from '../icons/ArrowDown';
import { Button } from '../ui/button';
import ProfileIcon from '../icons/Profile';
import LogoutIcon from '../icons/Logout';
import MoonIcon from '../icons/Moon';
import SunIcon from '../icons/Sun';
import { signOut } from 'next-auth/react';
import { useTheme } from '@/app/context/ThemeProvider';

interface IProfileMenuProps {}

// ? shadcn command dialog  cmdk lib

const ProfileMenuRadix: React.FC<IProfileMenuProps> = (props) => {
  const { setMode } = useTheme();
  return (
    <DropdownMenu>
      <Trigger className="flex items-center gap-2" asChild>
        <div>
          <div className="relative w-[26px] h-[26px] lg:w-[34px] lg:h-[34px]">
            <Image
              src="/assets/images/no-image.svg"
              alt="avatar"
              fill
              className="ring-primary-500 ring-[1px] ring-offset-[3px] ring-offset-white-100 dark:ring-offset-black-800 rounded-lg"
            />
          </div>
          <span className="paragraph-2-medium max-md:hidden">Uros Bijelic</span>
          <ArrowDownIcon className="icon-white-400__dark-white-300 max-md:hidden" />
        </div>
      </Trigger>
      <Portal>
        <Content
          collisionPadding={10}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="min-w-[8rem] max-lg:mt-6 mt-7  flex flex-col border border-[#C5D0E666] dark:border-black-700 rounded-lg bg-white-100__dark-black-800 gap-5 p-5 shadow-header-menu data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          <Item className="paragraph-3-medium">
            <Button className="p-0 gap-2.5 h-auto">
              <ProfileIcon className="" />
              Profile
            </Button>
          </Item>
          <Item className="paragraph-3-medium gap-2.5">
            <Button
              className="p-0 gap-2.5 h-auto text-primary-500"
              onClick={() => signOut()}
            >
              <LogoutIcon />
              Logout
            </Button>
          </Item>
          <Separator className="h-px bg-[#C5D0E666]" />
          <Item className="flex gap-5 p-[3px] bg-primary-200 dark:bg-black-800 rounded-[15px] font-semibold text-black-800 dark:text-white-200 text-base">
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
          </Item>
        </Content>
      </Portal>
    </DropdownMenu>
  );
};

export default ProfileMenuRadix;

//className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
