import CreateContent from '@/components/content/CreateContent';
import { auth } from '@/lib/auth';

// ----------------------------------------------------------------

const CreateContentPage = async () => {
  const session = await auth();

  if (!session) throw new Error('User data not available!');

  return (
    <div className="create-page-wrapper pb-10">
      <CreateContent authorId={session.user.id} />
    </div>
  );
};

export default CreateContentPage;
