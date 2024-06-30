'use client';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

import { Button } from '../ui/button';

interface IMemberItemCardProps {
  id: string;
  userName: string;
  avatarImg: string | null;
  isViewDialog?: boolean;
}

// ----------------------------------------------------------------

const MemberItemCard: React.FC<IMemberItemCardProps> = ({
  userName,
  avatarImg,
  isViewDialog = false,
}) => {
  return (
    <li className="flex-between bg-light100__dark800 rounded-xl p-5 shadow-card">
      <div className="flex items-center gap-1.5">
        <div className="flex-center bg-white-600 size-[30px] rounded-full shrink-0">
          <Image
            src={avatarImg || '/assets/images/avatars/avatar-1.svg'}
            width={22}
            height={28}
            alt={userName}
            className="rounded-full"
          />
        </div>
        <span className="p1-medium !text-white-200">{userName}</span>
      </div>
      {!isViewDialog && (
        <DropdownMenu>
          <Trigger asChild>
            <Button className="w-auto">
              <Image
                src="/assets/icons/menu-vertical.svg"
                alt="Menu"
                width={16}
                height={16}
              />
            </Button>
          </Trigger>
          <Portal>
            <Content
              avoidCollisions
              collisionPadding={15}
              sideOffset={8}
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="bg-light200__dark700 shadow-header-menu data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex w-40 flex-col gap-2.5 rounded-[10px] py-4 px-5 "
            >
              <Item
                onSelect={() => {}}
                className="flex items-center gap-2.5 p3-medium cursor-pointer"
              >
                Assign Admin Role
              </Item>
              <Item
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-2.5 p3-medium !text-[#FF584D] cursor-pointer"
              >
                Remove User
              </Item>
            </Content>
          </Portal>
        </DropdownMenu>
      )}
    </li>
  );
};

export default MemberItemCard;
