import EditProfile from '@/components/profile/EditProfile';
import { IProfileUserResponse } from '@/types/user';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IUserEditPageProps {
  params: {
    id: string;
  };
}

const EditProfilePage: React.FC<IUserEditPageProps> = async ({ params }) => {
  const id = params.id;

  const userResult = await typedFetch<IProfileUserResponse>({
    url: `/user/${id}`,
  });

  return <EditProfile user={userResult.user} />;
};

export default EditProfilePage;
