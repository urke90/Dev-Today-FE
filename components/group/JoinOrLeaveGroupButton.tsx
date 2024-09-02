'use client';

import GroupLeaveOrDeleteDialog from './GroupLeaveOrDeleteDialog';

import LogoutSecondIcon from '../icons/LogoutSecond';
import { Button } from '../ui/button';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { joinGroup, leaveGroup } from '@/utils/mutations';

// ----------------------------------------------------------------

interface IJoinOrLeaveGroupButtonProps {
  isGroupMemeber: boolean;
  userId: string;
  groupId: string;
}

const JoinOrLeaveGroupButton: React.FC<IJoinOrLeaveGroupButtonProps> = ({
  isGroupMemeber,
  groupId,
  userId,
}) => {
  const [isMember, setIsMember] = useState(isGroupMemeber);
  const [isOpen, setIsOpen] = useState(false);

  const { isPending: isPendingJoinGroup, mutateAsync: joinGroupAsync } =
    useMutation({
      mutationKey: ['JOIN_GROUP'],
      mutationFn: ({
        groupId,
        userId,
      }: Pick<IJoinOrLeaveGroupButtonProps, 'groupId' | 'userId'>) =>
        joinGroup(groupId, userId),
    });

  const { isPending: isPendingLeaveGroup, mutateAsync: leaveGroupAsync } =
    useMutation({
      mutationKey: ['LEAVE_GROUP'],
      mutationFn: ({
        groupId,
        userId,
      }: Pick<IJoinOrLeaveGroupButtonProps, 'groupId' | 'userId'>) =>
        leaveGroup(groupId, userId),
    });

  const handleLeaveGroup = async () => {
    try {
      await leaveGroupAsync({ groupId, userId });
      setIsMember(false);
      setIsOpen(false);
      toast.success('Group left successfully!');
    } catch (error) {
      console.log('Error on group leave', error);
      toast.error("Something went wrong. Couldn't leave group.");
    }
  };

  const handleJoinGroup = async () => {
    try {
      await joinGroupAsync({ groupId, userId });
      setIsMember(true);
      setIsOpen(false);
      toast.success('Group joined successfully!');
    } catch (error) {
      console.log('Error on join group', error);
      toast.error("Something went wrong. Couldn't joing group.");
    }
  };

  return (
    <>
      <GroupLeaveOrDeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLeaveGroup={handleLeaveGroup}
      />
      <Button
        size="small"
        className={`icon-light400__dark300 gap-1 px-4 ${isMember ? 'bg-white-200 dark:bg-black-700' : 'bg-primary-500'}`}
        onClick={isMember ? () => setIsOpen(true) : handleJoinGroup}
        disabled={isPendingJoinGroup || isPendingLeaveGroup}
      >
        {isMember ? (
          <>
            <LogoutSecondIcon />
            <span className="text-white-400 dark:text-white-300">
              Leave Group
            </span>
          </>
        ) : (
          <span className="text-white-100">Join group</span>
        )}
      </Button>
    </>
  );
};

export default JoinOrLeaveGroupButton;
