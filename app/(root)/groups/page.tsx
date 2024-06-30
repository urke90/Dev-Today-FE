import { auth } from '@/app/api/auth/[...nextauth]/route';
import GroupsHome from '@/components/group/GroupsHome';
import type {
  IAllGroupsSidebarDetails,
  IHomePageGroupsResponse,
} from '@/types/group';
import { ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ---------------------------------------- ------------------------

interface IGroupsPage {
  searchParams: {
    sortBy: string | string[] | undefined;
  };
}

const GroupsPage: React.FC<IGroupsPage> = async ({ searchParams }) => {
  const sortBy: ESortByFilter = parseSearchParams(searchParams.sortBy, '');

  const sortQuery = sortBy ? `&sortBy=${sortBy}` : '';

  const session = await auth();
  if (!session) throw new Error('User session is not available!');

  const groupsData = await typedFetch<IHomePageGroupsResponse>({
    url: `/groups?members=true&viewerId=${session.user.id}${sortQuery}`,
  });

  if (!groupsData) throw new Error('Internal server error!');

  const sidbarDetails = await typedFetch<IAllGroupsSidebarDetails>({
    url: '/groups/stats',
  });

  return (
    <GroupsHome
      groupsData={groupsData}
      sortBy={sortBy}
      sidebarDetails={sidbarDetails}
      viewerId={session.user.id}
    />
  );
};

export default GroupsPage;
