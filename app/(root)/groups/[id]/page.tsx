import GroupDetails from '@/components/group/GroupDetails';
import type { IGroupDetailsResponse } from '@/types/group';
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
  const page = parseSearchParams(searchParams.page, '1');
  const contentType = parseSearchParams<EQueryType>(
    searchParams.type,
    EQueryType.POST
  );

  const groupDetails = await typedFetch<IGroupDetailsResponse>({
    url: `/groups/${id}?topRankedGroup=true&stats=true&members=true`,
    cache: 'no-cache',
  });
  if (!groupDetails)
    throw new Error(
      'Internal server error. Group details not available at the moment.'
    );

  return (
    <section className="px-3.5 lg:px-5">
      <GroupDetails
        contentType={contentType}
        group={groupDetails.group}
        topRankedGroups={groupDetails.topRankedGroups}
      />
    </section>
  );
};

export default GroupDetailsPage;
