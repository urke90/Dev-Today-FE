import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreatePosts from '@/components/createPosts/CreatePosts';
import { ISelectGroup } from '@/types/group';
import { typedFetch } from '@/utils/api';

const Create = async () => {
  const session = await auth();

  if (!session) throw new Error(' User data not available!');

  const authorId = session.user.id;

  const allGroups = await typedFetch<ISelectGroup>({
    url: `/groups/content-create?${session.user.name}`,
  });

  if (!allGroups) throw new Error('Groups not available!');

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreatePosts allGroups={allGroups} authorId={authorId} />
    </div>
  );
};

export default Create;
