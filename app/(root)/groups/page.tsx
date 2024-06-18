import { auth } from '@/app/api/auth/[...nextauth]/route';
import GroupHome from '@/components/group/GroupHome';
import type {
  IAllGroupsResponse,
  IAllGroupsSidebarDetails,
} from '@/types/group';
import { typedFetch } from '@/utils/api';

// ---------------------------------------- ------------------------

const GroupsPage: React.FC = async () => {
  const session = await auth();
  if (!session) throw new Error('User session is not available!');

  const groups = await typedFetch<IAllGroupsResponse>({
    url: '/groups?members=true',
  });

  if (!groups) throw new Error('Internal server error!');

  const sidbarDetails = await typedFetch<IAllGroupsSidebarDetails>({
    url: '/groups/stats',
  });

  return <GroupHome groupsData={groups} sidebarDetails={sidbarDetails} />;
};

export default GroupsPage;
