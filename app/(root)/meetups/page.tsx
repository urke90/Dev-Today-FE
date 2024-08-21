import MeetupsHome from '@/components/content/MeetupsHome';
import { auth } from '@/lib/auth';
import {
  IContentPagesResponse,
  IContentPagesSidebarResponse,
} from '@/types/content';
import { ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

interface IMeetupsPageProps {
  searchParams: {
    tag: string | string[] | undefined;
    sortBy: string | string[] | undefined;
  };
}

const MeetupsPage: React.FC<IMeetupsPageProps> = async ({ searchParams }) => {
  const tag = parseSearchParams(searchParams.tag, '').toLowerCase();
  const sortBy = parseSearchParams(searchParams.sortBy, '') as ESortByFilter;

  const session = await auth();
  if (!session) throw new Error('User not authenticated!');

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';

  const meetupsData = await typedFetch<IContentPagesResponse>({
    url: `/content?type=meetup&viewerId=${session.user.id}&tag=${tag}${sortByQuery}`,
  });

  if (!meetupsData)
    throw new Error("Something went wrong, can't show posts at the moment!");

  const sidebarData = await typedFetch<IContentPagesSidebarResponse>({
    url: `/content/stats?posts=true&podcasts=true&viewerId=${session.user.id}`,
  });

  if (!sidebarData)
    throw new Error("Something went wrong, can't show meetups at the moment!");

  return (
    <section className="px-3.5 lg:px-5">
      <MeetupsHome
        selectedTag={tag}
        meetupsData={meetupsData}
        viewerId={session.user.id}
        sortBy={sortBy}
        sidebarData={sidebarData}
      />
    </section>
  );
};

export default MeetupsPage;
