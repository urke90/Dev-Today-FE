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

import { revalidateRoute } from '@/lib/actions/revalidate';
import { typedFetch } from '@/utils/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import EditIcon from '../icons/Edit';
import { Button } from '../ui/button';
import GroupLeaveOrDeleteDialog from './GroupLeaveOrDeleteDialog';

// ----------------------------------------------------------------

interface IGroupDropdownMenuProps {
  groupId: string;
  isGroupOwner: boolean;
  viewerId: string;
}

const GroupDropdownMenu: React.FC<IGroupDropdownMenuProps> = ({
  groupId,
  isGroupOwner,
  viewerId,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteGroup = async () => {
    try {
      const response = await typedFetch<{ status: number; message: string }>({
        url: `/groups/${groupId}/delete`,
        method: 'DELETE',
        body: {
          viewerId,
        },
      });

      toast.success(response.message);
      revalidateRoute('/profile');
      revalidateRoute('/groups');
      router.push('/profile');
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      toast.error("Something went wrong, couldn't delete group!");
    }
  };

  return (
    <>
      <GroupLeaveOrDeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDeleteDialog
        handleDeleteGroup={handleDeleteGroup}
      />
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
            className="bg-light200__dark700 shadow-header-menu data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex w-40 flex-col gap-2.5 rounded-[10px] py-4 px-5"
          >
            <Item
              onSelect={() => router.push(`/groups/${groupId}/edit`)}
              className="dropdown-item"
            >
              <EditIcon /> Edit Group
            </Item>
            {isGroupOwner && (
              <Item
                onSelect={() => setIsOpen(true)}
                className="dropdown-item !text-error-text "
              >
                <Image
                  src="/assets/icons/trash.svg"
                  width={18}
                  height={18}
                  alt="Delete"
                />
                Delete Group
              </Item>
            )}
          </Content>
        </Portal>
      </DropdownMenu>
    </>
  );
};

export default GroupDropdownMenu;
