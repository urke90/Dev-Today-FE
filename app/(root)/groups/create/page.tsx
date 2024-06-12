import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreateGroup from '@/components/createGroup/CreateGroup';

const CreateGroups = async () => {
  const session = await auth();
  if (!session) throw new Error(' User data not available!');

  const authorId = session.user.id;

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreateGroup authorId={authorId} />
    </div>
  );
};

export default CreateGroups;
