'use client';

import Image from 'next/image';
import {
  DropdownMenu,
  Trigger,
  Portal,
  Content,
  Item,
} from '@radix-ui/react-dropdown-menu';
import NotificationIcon from '../icons/Notification';
import CheckmarkIcon from '../icons/Checkmark';
import { Button } from '../ui/button';

interface INotificationMenuProps {}

// ----------------------------------------------------------------

const NotificationMenu: React.FC<INotificationMenuProps> = (props) => {
  return (
    <DropdownMenu>
      <Trigger asChild>
        <Button className="p-1.5 lg:p-2.5 bg-white-200 dark:bg-black-700 h-auto">
          <NotificationIcon className="icon-white-400__dark-white-300" />
        </Button>
      </Trigger>
      <Portal>
        <Content
          avoidCollisions
          collisionPadding={15}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="w-[346px] max-lg:mt-6 mt-7 lg:w-96 flex flex-col border border-[#C5D0E666] dark:border-black-700 rounded-[14px] bg-white-100__dark-black-800 gap-5 p-5 shadow-header-menu data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          <Item
            onSelect={(e) => e.preventDefault()}
            className="p4-medium flex-between"
          >
            <span className="p1-bold">3 Notifications</span>
            <button
              onClick={() => alert('Check All clicked')}
              className="bg-white-200 text-white-400 dark:text-white-300 dark:bg-black-700 gap-1 px-2.5 py-2 rounded max-lg:hidden flex-between p4-medium"
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
              className="bg-white-200 text-white-400 dark:text-white-300 dark:bg-black-700 gap-1 px-2.5 py-2 rounded flex-center w-full"
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
      className="flex gap-2.5 items-center"
    >
      <div className="relative shrink-0">
        <div className="size-2 bg-primary-500 absolute rounded-full right-0" />
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
          <span className="dark:text-white-300 text-black-700 font-normal text-[10px]">
            15 mins ago
          </span>
        </div>
        <p className="p4-regular line-clamp-1">{message}</p>
      </div>
    </Item>
  );
};

export default NotificationMenu;
