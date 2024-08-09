'use client';

import { getCldImageUrl } from 'next-cloudinary';
import ArrowDownIcon from '../icons/ArrowDown';
import LogoutIcon from '../icons/Logout';
import MoonIcon from '../icons/Moon';
import ProfileIcon from '../icons/Profile';
import SunIcon from '../icons/Sun';
import { Button } from '../ui/button';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';

import Image from 'next/image';

import { CLOUDINARY_URL } from '@/constants';
import { useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState } from 'react';

// ----------------------------------------------------------------

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const { user } = useUser();

  console.log('user', user);

  const profileImage = user?.imageUrl.startsWith(CLOUDINARY_URL)
    ? getCldImageUrl({
        width: 60,
        height: 60,
        src: user.imageUrl,
        crop: 'fill',
      })
    : user?.imageUrl;

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className="flex items-center gap-2" asChild>
        <Button className="w-auto">
          <div className="relative size-[26px] lg:size-[34px]">
            <Image
              src={profileImage || '/assets/icons/image-preview.svg'}
              alt="avatar"
              fill
              className="ring-primary-500 ring-offset-white-100 dark:ring-offset-black-800 rounded-lg ring-1 ring-offset-[3px]"
            />
          </div>
          <span className="p2-medium max-md:hidden">{user?.username}</span>
          <ArrowDownIcon className="icon-light400__dark300 max-md:hidden" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          collisionPadding={10}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="bg-light100__dark800 shadow-header-menu border-white-border data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade dark:border-black-700 z-20 mt-7 flex min-w-44 flex-col gap-5 rounded-[14px] border p-5 max-lg:mt-6"
        >
          <DropdownMenu.Item className="p3-medium">
            <Link
              href="/profile"
              className="flex items-center gap-2.5"
              onClick={() => setIsOpen(false)}
            >
              <ProfileIcon />
              Profile
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="p3-medium gap-2.5">
            <Button
              className="justify-start gap-2.5 text-primary-500"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogoutIcon />
              Logout
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="bg-white-border h-px" />

          <DropdownMenu.Item className="bg-primary-200 text-black-800 dark:bg-black-800 dark:text-white-200 flex gap-5 rounded-[15px] p-[3px] text-base font-semibold">
            Interface
            <div className="flex gap-2.5">
              <Button
                className="bg-primary-100 dark:bg-black-800 size-[24px] rounded-full"
                onClick={() => setTheme('light')}
              >
                <SunIcon className="text-black-700" />
              </Button>
              <Button
                className="bg-white-200 dark:bg-black-700 size-[24px] rounded-full"
                onClick={() => setTheme('dark')}
              >
                <MoonIcon className="dark:text-dark-700 text-white-300" />
              </Button>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileMenu;
