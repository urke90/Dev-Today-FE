import { auth } from '@/app/api/auth/[...nextauth]/route';
import EditProfile from '@/components/profile/EditProfile';
import { IProfileUserResponse } from '@/types/user';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

const EditProfilePage: React.FC = async () => {
  console.log('EditProfilePage');
  const session = await auth();
  if (!session?.user) throw new Error('User data not available!');

  const userResult = await typedFetch<IProfileUserResponse>({
    url: `/user/${session.user.id}`,
    cache: 'no-store',
  });

  return <EditProfile user={userResult.user} />;
};

export default EditProfilePage;
