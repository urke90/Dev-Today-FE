import ProfileHome from '@/components/profile/ProfileHome';
import { auth } from '@/lib/auth';
import type { IProfilePageContentResponse } from '@/types/content';
import type { IProfilePageGroupsResponse } from '@/types/group';
import { EQueryType } from '@/types/queries';
import type { IProfileUserResponse } from '@/types/user';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

interface IUserProfilePageProps {
  params: {
    id: string;
  };
  searchParams: {
    page: string | string[] | undefined;
    type: string | string[] | undefined;
  };
}

const UserProfilePage: React.FC<IUserProfilePageProps> = async ({
  params,
  searchParams,
}) => {
  const id = params.id;

  const contentType = parseSearchParams<EQueryType>(
    searchParams.type,
    EQueryType.POST
  );

  const session = await auth();
  if (!session?.user) throw new Error('User data not available!');

  const userResponse = await typedFetch<IProfileUserResponse>({
    url: `/user/${id}`,
  });

  let content = {};
  let groups = {};
  if (contentType === EQueryType.GROUP) {
    groups = await typedFetch<IProfilePageGroupsResponse>({
      url: `/user/${session.user.id}/groups`,
    });
  } else {
    content = await typedFetch<IProfilePageContentResponse>({
      url: `/user/${session.user.id}/content?type=${contentType}&viewerId=${session.user.id}`,
    });
  }

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome
        user={userResponse.user}
        contentType={contentType}
        isFollowing={userResponse.isFollowing}
        contentData={content as IProfilePageContentResponse}
        groupsData={groups as IProfilePageGroupsResponse}
        viewerId={session.user.id}
      />
    </section>
  );
};

export default UserProfilePage;
