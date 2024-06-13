import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreatePosts from '@/components/createPosts/CreatePosts';

const Create = async () => {
  const session = await auth();

  if (!session) throw new Error(' User data not available!');

  const authorId = session.user.id;

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreatePosts authorId={authorId} />
    </div>
  );
};

export default Create;
