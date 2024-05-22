'use client';

import { Button } from '../ui/button';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-primary-500 bg-primary-500 py-3 text-sm font-bold text-white-100 outline-none transition-colors"
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
