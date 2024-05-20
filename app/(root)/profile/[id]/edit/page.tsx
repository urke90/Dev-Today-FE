import EditProfile from '@/components/profile/EditProfile';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { typedFetch } from '@/utils/api';
import { IUserResponse } from '@/types/user';

// ----------------------------------------------------------------

interface IUserEditPageProps {
  params: {
    id: string;
  };
}

const EditProfilePage: React.FC<IUserEditPageProps> = async ({ params }) => {
  const id = params.id;

  const userResult = await typedFetch<IUserResponse>(`/user/${id}`);

  return <EditProfile user={userResult.user} />;
};

export default EditProfilePage;
