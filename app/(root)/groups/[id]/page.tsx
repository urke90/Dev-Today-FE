import { auth } from '@/app/api/auth/[...nextauth]/route';
import GroupDetails from '@/components/group/GroupDetails';
import type {
  IGroupContentResponse,
  IGroupDetailsResponse,
  IGroupMembersResponse,
} from '@/types/group';
import { EQueryType } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

interface IGroupDetailsPage {
  params: {
    id: string;
  };
  searchParams: {
    page: string | string[] | undefined;
    type: string | string[] | undefined;
  };
}

const GroupDetailsPage: React.FC<IGroupDetailsPage> = async ({
  params,
  searchParams,
}) => {
  const id = params.id;
  // const page = parseSearchParams(searchParams.page, '1');
  const contentType = parseSearchParams<EQueryType>(
    searchParams.type,
    EQueryType.POST
  );

  console.log('CONTENT TYPE', contentType);

  const session = await auth();
  if (!session) throw new Error('User data not available!');

  const groupDetails = await typedFetch<IGroupDetailsResponse>({
    url: `/groups/${id}?topRankedGroups=true&stats=true&members=true&meetups=true&viewerId=${session.user.id}`,
    cache: 'no-cache',
  });
  if (!groupDetails)
    throw new Error(
      'Internal server error. Group details not available at the moment.'
    );

  let groupContent = {};
  let groupMembers = {};

  if (contentType !== EQueryType.MEMBERS) {
    groupContent = await typedFetch<IGroupContentResponse>({
      url: `/groups/${id}/content?type=${contentType}&viewerId=${session.user.id}`,
    });
  } else if (contentType === EQueryType.MEMBERS) {
    groupMembers = await typedFetch<IGroupMembersResponse>({
      url: `/groups/${id}/members`,
    });
  }

  return (
    <section className="px-3.5 lg:px-5">
      <GroupDetails
        contentType={contentType}
        group={groupDetails.group}
        topRankedGroups={groupDetails.topRankedGroups}
        isGroupOwner={groupDetails.isGroupOwner}
        isGroupAdmin={groupDetails.isGroupAdmin}
        isGroupUser={groupDetails.isGroupUser}
        groupContent={groupContent as IGroupContentResponse}
        groupMembers={groupMembers as IGroupMembersResponse}
        viewerId={session.user.id}
      />
    </section>
  );
};

export default GroupDetailsPage;
