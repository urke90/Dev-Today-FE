import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreateGroup from '@/components/group/CreateGroup';

const CreateGroups = async () => {
  const session = await auth();
  if (!session) throw new Error(' User data not available!');

  return (
    <div className="create-page-wrapper">
      <CreateGroup viewerId={session.user.id} />
    </div>
  );
};

export default CreateGroups;
