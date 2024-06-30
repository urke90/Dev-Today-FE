import PostsHome from '@/components/content/PostsHome';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

interface IPostsPageProps {
  searchParams: {
    tag: string | string[] | undefined;
  };
}

const PostsPage: React.FC<IPostsPageProps> = ({ searchParams }) => {
  const tag = parseSearchParams(searchParams.tag, '').toLowerCase();

  return (
    <section className="px-3.5 lg:px-5">
      <PostsHome selectedTag={tag} />
    </section>
  );
};

export default PostsPage;
