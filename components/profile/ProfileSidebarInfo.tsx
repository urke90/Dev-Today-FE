'use client';

import { typedFetch } from '@/utils/api';
import { Button } from '../ui/button';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
          className="border-primary-500 bg-primary-500 text-white-100 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border py-3 text-sm font-bold outline-none transition-colors"
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
