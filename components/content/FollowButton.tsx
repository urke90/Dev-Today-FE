'use client';

import { typedFetch } from '@/utils/api';
import { useState } from 'react';
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
  const [isFollowing, setIsFollowing] = useState(isFollowingInit);

  const handleFollow = async () => {
    try {
      await typedFetch({
        url: `/user/${authorId}/follow`,
        method: 'POST',
        body: {
          userId: viewerId,
        },
      });
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      // revalidateRoute(`/user/${authorId}`);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to follow user');
    }
  };

  return (
    <Button
      size="small"
      onClick={handleFollow}
      className="dark:bg-black-900 bg-white-300 transition-colors hover:bg-white-400 hover:text-white-100 hover:dark:bg-black-700 text-purple-500  rounded border border-transparent"
    >
      {isFollowing ? 'Fallowing' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
