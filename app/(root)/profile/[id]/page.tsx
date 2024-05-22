import ProfileHome from '@/components/profile/ProfileHome';
import { EQueryContentType, type IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
import type { IUserResponse } from '@/types/user';
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
  const page = parseSearchParams(searchParams.page, '1');
  const contentType = parseSearchParams<EQueryContentType>(
    searchParams.type,
    EQueryContentType.POSTS
  );

  const userResult = await typedFetch<IUserResponse>(`/user/${id}`);

  let content: { content: IContent[] } = { content: [] };
  let groupContent: IGroup[] = [];
  if (contentType === EQueryContentType.GROUPS) {
    groupContent = await typedFetch(`/user/${id}/groups`);
  } else {
    content = await typedFetch(
      `/user/${id}/content?type=${contentType}&page=${page}`
    );
  }

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome
        user={userResult.user}
        latestContent={userResult.contents}
        isFollowing={userResult.isFollowing}
        contentType={contentType}
        contentItems={content.content}
        groupItems={groupContent}
      />
    </section>
  );
};

export default UserProfilePage;
