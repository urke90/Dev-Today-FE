import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreatePosts from '@/components/createPosts/CreatePosts';
import { ISelectGroup, ITags } from '@/types/group';
import { typedFetch } from '@/utils/api';

const Create = async () => {
  const session = await auth();

  if (!session) throw new Error(' User data not available!');

  const authorId = session.user.id;

  const allGroups = await typedFetch<ISelectGroup>({
    url: `/groups/content-create?${session.user.name}`,
  });
  if (!allGroups) throw new Error('Groups not available!');

  const allTags = await typedFetch<ITags>({ url: `/content/tags` });

  if (!allTags) throw new Error('Tags not available!');

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreatePosts
        allTags={allTags}
        allGroups={allGroups}
        authorId={authorId}
      />
    </div>
  );
};

export default Create;
