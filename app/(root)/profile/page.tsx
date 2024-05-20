import ProfileHome from '@/components/profile/ProfileHome';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import type { IUserResponse } from '@/types/user';
import type { IGroup } from '@/types/group';
import { EQueryContentType, type IContent } from '@/types/content';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

interface IMyProfilePageProps {
  searchParams: {
    page: string | string[] | undefined;
    type: string | string[] | undefined;
  };
}

const MyProfilePage: React.FC<IMyProfilePageProps> = async ({
  searchParams,
}) => {
  const page = parseSearchParams(searchParams.page, '1');
  const contentType = parseSearchParams<EQueryContentType>(
    searchParams.type,
    EQueryContentType.POSTS
  );

  const session = await auth();
  if (!session?.user) throw new Error('User data not available!');

  const userResult = await typedFetch<IUserResponse>(
    `/user/${session?.user.id}`
  );

  let content: { content: IContent[] } = { content: [] };
  let groupContent: IGroup[] = [];
  if (contentType === EQueryContentType.GROUPS) {
    groupContent = await typedFetch(`/user/${session.user.id}/groups`);
  } else {
    content = await typedFetch(
      `/user/${session.user.id}/content?type=${contentType}&page=${page}`
    );
  }

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome
        isPersonalProfile
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

export default MyProfilePage;
