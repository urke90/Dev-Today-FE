'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button } from '../ui/button';

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
          className="bg-primary-500 border border-primary-500 transition-colors text-white-100 py-3 inline-flex items-center justify-center outline-none w-full rounded-lg gap-2.5 text-sm font-bold"
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
