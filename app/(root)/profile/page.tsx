import React from 'react';
import ProfileHome from '@/components/profile/ProfileHome';
import { getServerSession } from 'next-auth';

// ----------------------------------------------------------------

interface IMyProfilePageProps {
  searchParams: {
    page: string | string[] | undefined;
    contentType: string | string[] | undefined;
  };
}

const MyProfilePage: React.FC<IMyProfilePageProps> = async ({
  searchParams,
}) => {
  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome isPersonalProfile />;
    </section>
  );
};

export default MyProfilePage;
