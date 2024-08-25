'use client';

import { Button } from '../ui/button';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IProfileSidebarInfoProps {
  userProfileId: string;
  viewerId: string;
  isPersonalProfile: boolean;
  isFollowing: boolean;
}

const ProfileSidebarInfo: React.FC<IProfileSidebarInfoProps> = ({
  isPersonalProfile,
  isFollowing,
  userProfileId,
  viewerId,
}) => {
  const pathname = usePathname();
  const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);

  const handleFollowUser = async () => {
    try {
      await typedFetch({
        url: `/user/${userProfileId}/follow`,
        method: 'POST',
        body: {
          userId: viewerId,
        },
      });
      toast.success('User followed successfully.');

      setIsFollowingUser(true);
    } catch (error) {
      console.log('Error following/unfollowing user', error);
      toast.error('Ooops, something went wrong!');
    }
  };

  const handleUnfollowUser = async () => {
    try {
      await typedFetch({
        url: `/user/${userProfileId}/unfollow`,
        method: 'DELETE',
        body: {
          userId: viewerId,
        },
      });
      toast.success('User unfollowed successfully.');

      setIsFollowingUser(false);
    } catch (error) {
      console.log('Error unfollowing user', error);
    }
  };

  return (
    <>
      {isPersonalProfile ? (
        <Link
          href={pathname + '/edit'}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-primary-500 bg-primary-500 py-3 text-sm font-bold text-white-100 outline-none transition-colors"
        >
          Edit Profile
        </Link>
      ) : (
        <Button
          variant="primary"
          onClick={isFollowingUser ? handleUnfollowUser : handleFollowUser}
        >
          {isFollowingUser ? 'Following' : 'Follow'}
        </Button>
      )}
    </>
  );
};

export default ProfileSidebarInfo;
