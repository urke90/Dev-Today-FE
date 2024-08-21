'use client';

import { calculateTimeAgo } from '@/utils/format';
import CheckmarkIcon from '../icons/Checkmark';
import NotificationIcon from '../icons/Notification';
import { Button } from '../ui/button';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useState } from 'react';

interface INotificationMenuProps {}

// ----------------------------------------------------------------

const NotificationMenu: React.FC<INotificationMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          className={`nav-btn-light200__dark700 ${isOpen ? '!bg-primary-500' : ''}`}
        >
          <NotificationIcon
            className={`icon-light400__dark300 ${isOpen ? '!text-[#F9F9FA]' : ''}`}
          />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          avoidCollisions
          collisionPadding={15}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="bg-light100__dark800 shadow-header-menu border-white-border data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade dark:border-black-700 z-20 mt-7 flex w-[346px] flex-col gap-5 rounded-[14px] border p-5 max-lg:mt-6 lg:w-96"
        >
          <DropdownMenu.Item
            onSelect={(e) => e.preventDefault()}
            className="p4-medium flex-between"
          >
            <span className="p1-bold">3 Notifications</span>
            <button
              onClick={() => alert('Check All clicked')}
              className="flex-between p4-medium bg-white-200 text-white-400 dark:bg-black-700 dark:text-white-300 gap-1 rounded px-2.5 py-2 max-lg:hidden"
            >
              <CheckmarkIcon />
              Mark All Read
            </button>
          </DropdownMenu.Item>
          <NotificationItem
            imgUrl="/assets/icons/image-preview.svg"
            likedBy="Christopher Soltis"
            timeAgo={new Date()}
            message="Liked your Post What is the ideal Tech stack to build..."
          />

          <DropdownMenu.Item
            onSelect={(e) => e.preventDefault()}
            className="p4-medium lg:hidden"
          >
            <button
              onClick={() => alert('Check All clicked')}
              className="flex-center bg-white-200 text-white-400 dark:bg-black-700 dark:text-white-300 w-full gap-1 rounded px-2.5 py-2"
            >
              <CheckmarkIcon />
              Mark All Read
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface INotificationItemProps {
  imgUrl: string;
  likedBy: string;
  timeAgo: Date | string;
  message: string;
}

const NotificationItem: React.FC<INotificationItemProps> = ({
  imgUrl,
  likedBy,
  message,
  timeAgo,
}) => {
  return (
    <DropdownMenu.Item
      onSelect={(e) => e.preventDefault()}
      className="flex items-center gap-2.5"
    >
      <div className="relative shrink-0">
        <div className="bg-primary-500 absolute right-0 size-2 rounded-full" />
        <Image
          src={imgUrl}
          width={40}
          height={40}
          alt="avatar"
          className="size-10 rounded-full bg-primary-100 dark:bg-primary-500"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex-between">
          <span className="p3-bold">{likedBy}</span>
          <span className="text-black-700 dark:text-white-300 text-[10px] font-normal">
            {calculateTimeAgo(timeAgo)}
          </span>
        </div>
        <p className="p4-regular line-clamp-1">{message}</p>
      </div>
    </DropdownMenu.Item>
  );
};

export default NotificationMenu;
