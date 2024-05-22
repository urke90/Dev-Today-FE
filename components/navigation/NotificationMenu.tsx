'use client';

import NotificationIcon from '../icons/Notification';
import CheckmarkIcon from '../icons/Checkmark';
import { Button } from '../ui/button';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

interface INotificationMenuProps {}

// ----------------------------------------------------------------

const NotificationMenu: React.FC<INotificationMenuProps> = (props) => {
  return (
    <DropdownMenu>
      <Trigger asChild>
        <Button className="nav-btn-light200__dark700 ">
          <NotificationIcon className="icon-light400__dark300" />
        </Button>
      </Trigger>
      <Portal>
        <Content
          avoidCollisions
          collisionPadding={15}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="bg-light100__dark800 shadow-header-menu z-20 mt-7 flex w-[346px] flex-col gap-5 rounded-[14px] border border-white-border p-5 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade dark:border-black-700 max-lg:mt-6 lg:w-96"
        >
          <Item
            onSelect={(e) => e.preventDefault()}
            className="p4-medium flex-between"
          >
            <span className="p1-bold">3 Notifications</span>
            <button
              onClick={() => alert('Check All clicked')}
              className="flex-between p4-medium gap-1 rounded bg-white-200 px-2.5 py-2 text-white-400 dark:bg-black-700 dark:text-white-300 max-lg:hidden"
            >
              <CheckmarkIcon />
              Mark All Read
            </button>
          </Item>
          <NotificationItem
            imgUrl="/assets/images/no-image.svg"
            likedBy="Christopher Soltis"
            timeAgo={new Date()}
            message="Liked your Post What is the ideal Tech stack to build..."
          />

          <Item
            onSelect={(e) => e.preventDefault()}
            className="p4-medium lg:hidden"
          >
            <button
              onClick={() => alert('Check All clicked')}
              className="flex-center w-full gap-1 rounded bg-white-200 px-2.5 py-2 text-white-400 dark:bg-black-700 dark:text-white-300"
            >
              <CheckmarkIcon />
              Mark All Read
            </button>
          </Item>
        </Content>
      </Portal>
    </DropdownMenu>
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
    <Item
      onSelect={(e) => e.preventDefault()}
      className="flex items-center gap-2.5"
    >
      <div className="relative shrink-0">
        <div className="absolute right-0 size-2 rounded-full bg-primary-500" />
        <Image
          src={imgUrl}
          width={40}
          height={40}
          alt="avatar"
          className="size-10 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex-between">
          <span className="p3-bold">{likedBy}</span>
          <span className="text-[10px] font-normal text-black-700 dark:text-white-300">
            15 mins ago
          </span>
        </div>
        <p className="p4-regular line-clamp-1">{message}</p>
      </div>
    </Item>
  );
};

export default NotificationMenu;
