'use client';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

import { EUserRole } from '@/types/user';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

interface IMemberItemCardProps {
  id: string;
  userName: string;
  avatarImg: string | null;
  isViewDialog?: boolean;
  role: EUserRole;
  removeMember?: () => void;
  assignAdminRole?: () => void;
  removeAdminRole?: () => void;
}

// ----------------------------------------------------------------

const MemberItemCard: React.FC<IMemberItemCardProps> = ({
  userName,
  avatarImg,
  isViewDialog = false,
  removeMember,
  role: initRole,
  assignAdminRole,
  removeAdminRole,
}) => {
  const [role, setRole] = useState(initRole);

  const handleRemoveMember = async () => {
    try {
      removeMember && (await removeMember());

      toast.success('User removed successfully.');
    } catch (error) {
      toast.error("Something went wrong. Couldn't remove user.");
    }
  };

  const handleAssignAdminRole = async () => {
    try {
      assignAdminRole && (await assignAdminRole());

      setRole(EUserRole.ADMIN);
      toast.success('Assigned Admin role successfully.');
    } catch (error) {
      toast.error("Something went wrong. Couldn't assign Admin role.");
    }
  };

  const handleRemoveAdminRole = async () => {
    try {
      removeAdminRole && (await removeAdminRole());

      setRole(EUserRole.USER);
      toast.success('Removed Admin role successfully.');
    } catch (error) {
      toast.error("Something went wrong. Couldn't remove Admin role.");
    }
  };

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
        <span className="p1-medium dark:!text-white-200 !text-black-800">
          {userName}
        </span>
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
              className="bg-light200__dark700 shadow-header-menu data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex w-42 flex-col gap-2.5 rounded-[10px] py-4 px-5 "
            >
              <Item
                onSelect={
                  role === EUserRole.ADMIN
                    ? handleRemoveAdminRole
                    : handleAssignAdminRole
                }
                // onClick={
                //   role === EUserRole.ADMIN
                //     ? handleRemoveAdminRole
                //     : handleAssignAdminRole
                // }
                className="flex items-center gap-2.5 p3-medium cursor-pointer"
              >
                {role === EUserRole.ADMIN
                  ? 'Remove Admin Role'
                  : 'Assign Admin Role'}
              </Item>
              <Item
                onSelect={handleRemoveMember}
                className="flex items-center gap-2.5 p3-medium !text-error-text cursor-pointer"
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
