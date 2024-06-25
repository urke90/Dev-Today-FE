'use client';

import { joinGroup, leaveGroup } from '@/api/mutations';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import LogoutSecondIcon from '../icons/LogoutSecond';
import { Button } from '../ui/button';

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

  const handleJoinOrLeaveGroup = async () => {
    try {
      if (isMember) {
        await leaveGroupAsync({ groupId, userId });
        setIsMember(false);
        toast.success('Group left successfully!');
      } else {
        await joinGroupAsync({ groupId, userId });
        setIsMember(true);
        toast.success('Group joined successfully!');
      }
    } catch (error) {
      console.log('Error join or leave group', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <Button
      size="small"
      className={`px-4 gap-1 icon-light400__dark300 ${isMember ? 'bg-white-200 dark:bg-black-700' : 'bg-primary-500'}`}
      onClick={handleJoinOrLeaveGroup}
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
  );
};

export default JoinOrLeaveGroupButton;
