import ProfileHome from '@/components/profile/ProfileHome';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { IUserResponse } from '@/types/user';
import { EContentType } from '@/types/content';
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
  const pageParam = parseSearchParams(searchParams.page, '1');
  const contentTypeParam = parseSearchParams<EContentType>(
    searchParams.type,
    EContentType.POSTS
  );

  const session = await auth();
  if (!session?.user) throw new Error('User data not available!');

  const userResult = await typedFetch<IUserResponse>(
    `/user/${session?.user.id}`
  );

  let content; // : IContent[] | IGroup[]
  if (contentTypeParam === EContentType.GROUPS) {
    content = await typedFetch(`/user/${session.user.id}/groups`);
  } else {
    content = await typedFetch(`/user/${session.user.id}/content`);
  }

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome
        user={userResult.user}
        latestContent={userResult.latestContent.contents}
        isFollowing={userResult.isFollowing}
        isPersonalProfile
        contentType={contentTypeParam}
      />
    </section>
  );
};

export default MyProfilePage;
