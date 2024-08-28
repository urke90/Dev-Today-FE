'use client';

import { Button } from '../ui/button';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IFollowButtonProps {
  isFollowingInit: boolean;
  viewerId: string;
  authorId: string;
}

const FollowButton: React.FC<IFollowButtonProps> = ({
  isFollowingInit,
  viewerId,
  authorId,
}) => {
  const [isFollowingUser, setIsFollowingUser] = useState(isFollowingInit);

  const handleFollow = async () => {
    try {
      await typedFetch({
        url: `/user/${authorId}/follow`,
        method: 'POST',
        body: {
          userId: viewerId,
        },
      });
      setIsFollowingUser(true);
      toast.success('User followed successfully.');
      // revalidateRoute(`/user/${authorId}`);
    } catch (error) {
      console.error('Error following user', error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      await typedFetch({
        url: `/user/${authorId}/unfollow`,
        method: 'DELETE',
        body: {
          userId: viewerId,
        },
      });
      toast.success('User unfollowed successfully.');

      setIsFollowingUser(false);
    } catch (error) {}
  };

  return (
    <Button
      size="medium"
      onClick={isFollowingUser ? handleUnfollowUser : handleFollow}
      className="rounded border border-transparent bg-white-300 text-purple-500 transition-colors hover:bg-white-400  hover:text-white-100 dark:bg-black-900 hover:dark:bg-black-700"
    >
      {isFollowingUser ? 'Fallowing' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
