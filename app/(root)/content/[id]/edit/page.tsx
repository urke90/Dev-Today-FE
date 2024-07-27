import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreateContent from '@/components/content/CreateContent';
import type { IContentDTO } from '@/lib/validation';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IEditPostPageProps {
  params: {
    id: string;
  };
}

const EditPostPage: React.FC<IEditPostPageProps> = async ({ params }) => {
  const session = await auth();

  if (!session) throw new Error(' User data not available!');

  const content = await typedFetch<IContentDTO>({
    url: `/content/${params.id}`,
    cache: 'no-cache',
  });

  if (!content) throw new Error('Post not available!');

  return (
    <div className="create-page-wrapper pb-10">
      <CreateContent content={content} viewerId={session.user.id} />
    </div>
  );
};

export default EditPostPage;
