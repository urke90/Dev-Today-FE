import { auth } from '@/app/api/auth/[...nextauth]/route';
import GroupHome from '@/components/group/GroupHome';
import type { IGroup } from '@/types/group';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IGroupsPageProps {}

const GroupsPage: React.FC<IGroupsPageProps> = async (props) => {
  const session = await auth();
  if (!session) throw new Error('User session is not available!');

  const groups = await typedFetch<IGroup[]>({ url: '/groups' });

  return (
    <section className="px-3.5 lg:px-5">
      <GroupHome groups={groups} />
    </section>
  );
};

export default GroupsPage;
