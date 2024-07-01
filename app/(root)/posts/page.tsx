import { auth } from '@/app/api/auth/[...nextauth]/route';
import PostsHome from '@/components/content/PostsHome';
import { IContentPagesResponse } from '@/types/content';
import { ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

interface IPostsPageProps {
  searchParams: {
    tag: string | string[] | undefined;
    sortBy: string | string[] | undefined;
  };
}

const PostsPage: React.FC<IPostsPageProps> = async ({ searchParams }) => {
  const tag = parseSearchParams(searchParams.tag, '').toLowerCase();
  const sortBy = parseSearchParams(searchParams.sortBy, '') as ESortByFilter;

  const session = await auth();
  if (!session) throw new Error('User not available!');

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';

  const postsData = await typedFetch<IContentPagesResponse>({
    url: `/content?type=post&viewerId=${session.user.id}${sortByQuery}`,
  });

  if (!postsData)
    throw new Error("Something went wrong, can't show posts at the moment!");

  return (
    <section className="px-3.5 lg:px-5">
      <PostsHome
        selectedTag={tag}
        postsData={postsData}
        viewerId={session.user.id}
        sortBy={sortBy}
      />
    </section>
  );
};

export default PostsPage;
