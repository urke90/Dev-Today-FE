import { auth } from '@/app/api/auth/[...nextauth]/route';
import CreatePosts from '@/components/createPosts/CreatePosts';
import { ISelectGroup, ITags } from '@/types/group';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

type SearchParamsProps = {
  searchParams: {
    q: string;
    title: string;
  };
};

const Create = async ({ searchParams }: SearchParamsProps) => {
  const session = await auth();

  const q = parseSearchParams(searchParams.q, '');
  const title = parseSearchParams(searchParams.title, '');

  if (!session) throw new Error(' User data not available!');

  const authorId = session.user.id;

  const allGroups = await typedFetch<ISelectGroup[]>({
    url: `/groups?q=${q}`,
  });
  if (!allGroups) throw new Error('Groups not available!');

  const allTags = await typedFetch<ITags[]>({
    url: `/content/tags?title=${title}`,
  });

  if (!allTags) throw new Error('Tags not available!');

  return (
    <div className="content-wrapper max-w-[900px]">
      <CreatePosts
        allTags={allTags}
        allGroups={allGroups}
        authorId={authorId}
      />
    </div>
  );
};

export default Create;
