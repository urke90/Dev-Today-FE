import ProfileHome from '@/components/profile/ProfileHome';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { IUserResponse } from '@/types/user';
import { EQueryContentType, IContent } from '@/types/content';
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

  let content: { content: IContent[] }; // : IContent[] | IGroup[]
  if (contentType === EQueryContentType.GROUPS) {
    content = await typedFetch(`/user/${session.user.id}/groups`);
  } else {
    content = await typedFetch(
      `/user/${session.user.id}/content?type=${contentType}&page=${page}`
    );
  }

  console.log('content: U PAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', content);

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome
        isPersonalProfile
        user={userResult.user}
        latestContent={userResult.contents}
        isFollowing={userResult.isFollowing}
        contentType={contentType}
        contentItems={content.content}
      />
    </section>
  );
};

export default MyProfilePage;
