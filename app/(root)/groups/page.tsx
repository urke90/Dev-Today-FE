import { auth } from '@/app/api/auth/[...nextauth]/route';
import GroupHome from '@/components/group/GroupHome';
import type { IAllGroupsResponse } from '@/types/group';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

const GroupsPage: React.FC = async () => {
  const session = await auth();
  if (!session) throw new Error('User session is not available!');

  const groups = await typedFetch<IAllGroupsResponse>({
    url: `/groups`,
  });

  if (!groups) throw new Error('Internal server error!');

  return (
    <section className="px-3.5 lg:px-5">
      <GroupHome groupsData={groups} userId={session.user.id} />
    </section>
  );
};

export default GroupsPage;
