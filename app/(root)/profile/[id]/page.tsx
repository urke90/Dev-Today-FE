import ProfileHome from '@/components/profile/ProfileHome';
import { EQueryContentType, type IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
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
    viewerId: string | string[] | undefined;
  };
}

const UserProfilePage: React.FC<IUserProfilePageProps> = async ({
  params,
  searchParams,
}) => {
  const id = params.id;
  const page = parseSearchParams(searchParams.page, '1');
  const contentType = parseSearchParams<EQueryContentType>(
    searchParams.type,
    EQueryContentType.POST
  );
  const viewerId = parseSearchParams(searchParams.viewerId, '');

  const userResult = await typedFetch<IProfileUserResponse>({
    url: `/user/${id}`,
  });

  let content: { content: IContent[] } = { content: [] };
  let groupContent: IGroup[] = [];
  if (contentType === EQueryContentType.GROUP) {
    groupContent = await typedFetch({ url: `/user/${id}/groups` });
  } else {
    content = await typedFetch({
      url: `/user/${id}/content?type=${contentType}&page=${page}&viewerId=${viewerId}`,
    });
  }

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome
        user={userResult.user}
        isFollowing={userResult.isFollowing}
        contentType={contentType}
        contentItems={content.content}
        groupItems={groupContent}
        viewerId={viewerId}
      />
    </section>
  );
};

export default UserProfilePage;
