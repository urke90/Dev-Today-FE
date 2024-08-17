import CreateGroup from '@/components/group/CreateGroup';
import { auth } from '@/lib/auth';
import type { IGroupDetailsResponse } from '@/types/group';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IEditGroupPageProps {
  params: {
    id: string;
  };
}

const EditGroupPage: React.FC<IEditGroupPageProps> = async ({ params }) => {
  const session = await auth();
  if (!session) throw new Error('User data not available!');

  const groupDetails = await typedFetch<IGroupDetailsResponse>({
    url: `/groups/${params.id}`,
    cache: 'no-cache',
  });

  if (!groupDetails) throw new Error('Group not available!');

  return (
    <div className="create-page-wrapper">
      <CreateGroup viewerId={session.user.id} group={groupDetails.group} />
    </div>
  );
};

export default EditGroupPage;
