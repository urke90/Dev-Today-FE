import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreatePosts from '@/components/createPosts/CreatePosts';
import { IContent } from '@/types/content';
import { ISelectGroup } from '@/types/group';
import { typedFetch } from '@/utils/api';

type Props = {
  params: {
    id: string;
  };
};

const EditPost = async ({ params }: Props) => {
  const contentId = params.id;
  const session = await auth();

  if (!session) throw new Error(' User data not available!');

  const allGroups = await typedFetch<ISelectGroup>({
    url: `/groups/content-create?${session.user.name}`,
  });
  if (!allGroups) throw new Error('Groups not available!');
  const editPost = await typedFetch<IContent>({
    url: `/content/${contentId}`,
  });

  console.log(editPost);

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreatePosts editPost={editPost} allGroups={allGroups} />
    </div>
  );
};

export default EditPost;
