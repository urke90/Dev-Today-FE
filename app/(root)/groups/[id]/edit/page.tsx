import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreateGroup from '@/components/createGroup/CreateGroup';
import { typedFetch } from '@/utils/api';

type Props = {
  params: {
    id: string;
  };
};

const EditGroup = async ({ params }: Props) => {
  const session = await auth();
  if (!session) throw new Error('User data not available!');

  const authorId = session.user.id;
  const groupId = params.id;

  let result;

  try {
    result = await typedFetch({
      url: `/groups/${groupId}/edit`,
      method: 'GET',
    });
  } catch (error) {
    console.error('Error fetching group', error);
    return null;
  }

  console.log(result);

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreateGroup authorId={authorId} />
    </div>
  );
};

export default EditGroup;
