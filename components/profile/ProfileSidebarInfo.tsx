'use client';

import { Button } from '../ui/button';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------

interface IProfileSidebarInfoProps {
  isPersonalProfile: boolean;
  isFollowing: boolean;
}

const ProfileSidebarInfo: React.FC<IProfileSidebarInfoProps> = ({
  isPersonalProfile,
  isFollowing,
}) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      {isPersonalProfile ? (
        <Link
          href={pathname + `/${session?.user?.id}/edit`}
          className="border-primary-500 bg-primary-500 text-white-100 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border py-3 text-sm font-bold outline-none transition-colors"
        >
          Edit Profile
        </Link>
      ) : (
        <Button variant="primary" onClick={() => alert('follow')}>
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      )}
    </>
  );
};

export default ProfileSidebarInfo;
