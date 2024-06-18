'use client';
import { Button } from '@/components/ui/button';
import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { EditIcon } from 'lucide-react';

import Image from 'next/image';

type Props = {
  id: string;
};

const ContentDetails = ({ id }: Props) => {
  return (
    <div className="main-content p1-bold w-full space-y-5">
      <Image
        src="/assets/images/post-example.svg"
        width={100}
        height={100}
        alt="post example"
        className="rounded-2xl w-full min-h-[232px] h-[300px] object-cover"
      />
      <div className="flex items-center justify-between">
        <h2 className="d2-bold">
          GitHub: The Heart of Developer Collaboration
        </h2>
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
              className="bg-light200__dark800 !w-48 px-5 shadow-header-menu data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex  flex-col gap-2.5 rounded-[10px] py-4 ">
              <Item
                // onSelect={() => router.push(`/groups//edit`)}
                className="flex items-center  gap-2.5 p3-medium cursor-pointer">
                <EditIcon />
                <p>Edit Group</p>
              </Item>
              <Item
                onSelect={(e) => e.preventDefault()}
                className="flex items-center  gap-2.5 p3-medium !text-[#FF584D] cursor-pointer">
                <Image
                  src="/assets/icons/trash.svg"
                  width={20}
                  height={18}
                  alt="Delete"
                />
                Delete Group
              </Item>
            </Content>
          </Portal>
        </DropdownMenu>
      </div>
      <div>
        <ul className="flex gap-2">
          {[0, 1, 2].map((tag: any, idx) => (
            <li
              key={idx}
              className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10 uppercase">
              nesto
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentDetails;
