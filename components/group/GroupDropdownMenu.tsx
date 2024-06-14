'use client';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import EditIcon from '../icons/Edit';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface IGroupDropdownMenuProps {
  groupId: string;
}

const GroupDropdownMenu: React.FC<IGroupDropdownMenuProps> = ({ groupId }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <Trigger asChild>
        <Button className="w-auto">
          <Image
            src="/assets/icons/menu-vertical.svg"
            alt="Menu"
            width={20}
            height={20}
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
            onSelect={() => router.push(`/groups/${groupId}/edit`)}
            className="flex items-center gap-2.5 p3-medium cursor-pointer"
          >
            <EditIcon /> Edit Group
          </Item>
          <Item
            onSelect={(e) => e.preventDefault()}
            className="flex items-center gap-2.5 p3-medium !text-[#FF584D] cursor-pointer"
          >
            <Image
              src="/assets/icons/trash.svg"
              width={18}
              height={18}
              alt="Delete"
            />
            Delete Group
          </Item>
        </Content>
      </Portal>
    </DropdownMenu>
  );
};

export default GroupDropdownMenu;
