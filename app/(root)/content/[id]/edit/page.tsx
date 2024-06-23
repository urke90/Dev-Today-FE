import CreatePosts from '@/components/createPosts/CreatePosts';
import { IContent } from '@/lib/validation';
import { ISelectGroup } from '@/types/group';
import { typedFetch } from '@/utils/api';

type Props = {
  params: {
    id: string;
  };
};

const EditPost = async ({ params }: Props) => {
  const contentId = params.id;

  const allGroups = await typedFetch<ISelectGroup[]>({
    url: `/groups`,
    cache: 'no-cache',
  });
  if (!allGroups) throw new Error('Groups not available!');
  const editPost = await typedFetch<IContent>({
    url: `/content/${contentId}`,
    cache: 'no-cache',
  });

  if (!editPost) throw new Error('Post not available!');

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreatePosts editPost={editPost} allGroups={allGroups} />
    </div>
  );
};

export default EditPost;
