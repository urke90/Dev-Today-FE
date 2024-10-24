import CreateContent from '@/components/content/CreateContent';
import { auth } from '@/lib/auth';
import type { IContentDTO } from '@/lib/validation';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IEditContentPageProps {
  params: {
    id: string;
  };
}

const EditContentPage: React.FC<IEditContentPageProps> = async ({ params }) => {
  const session = await auth();

  if (!session) throw new Error(' User data not available!');

  const content = await typedFetch<IContentDTO>({
    url: `/content/${params.id}`,
    cache: 'no-cache',
  });

  if (!content) throw new Error('Post not available!');

  return (
    <div className="create-page-wrapper pb-10">
      <CreateContent content={content} />
    </div>
  );
};

export default EditContentPage;
