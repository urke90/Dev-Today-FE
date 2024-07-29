'use client';

import { typedFetch } from '@/utils/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

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
      size="small"
      onClick={isFollowingUser ? handleUnfollowUser : handleFollow}
      className="dark:bg-black-900 bg-white-300 transition-colors hover:bg-white-400 hover:text-white-100 hover:dark:bg-black-700 text-purple-500  rounded border border-transparent"
    >
      {isFollowingUser ? 'Fallowing' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
