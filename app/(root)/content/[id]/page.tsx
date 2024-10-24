import Image from 'next/image';
import Link from 'next/link';

import ContentDetails from '@/components/content/ContentDetails';
import FollowButton from '@/components/content/FollowButton';
// import ShareOnSocialNetwork from '@/components/content/ShareOnSocialNetwork';
import SidebarContentCard from '@/components/shared/RightSidebarItems/SidebarContentCard';
import ShareOnSocialNetworkDialog from '@/components/shared/ShareOnSocialNetworkDialog';
// import ShareOnSocialNetworkDialog from '@/components/shared/ShareOnSocialNetworkDialog';
import ShareIcon from '@/components/icons/Share';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import type { IComment } from '@/lib/validation';
import type { IContent } from '@/types/content';
import type { IProfileUserResponse } from '@/types/user';
import { typedFetch } from '@/utils/api';
import { calculateTimeAgo, formatDate, getFirstName } from '@/utils/format';

// ----------------------------------------------------------------

interface IContentPageProps {
  params: {
    id: string;
  };
}

const ContentPage: React.FC<IContentPageProps> = async ({ params }) => {
  const id = params.id;
  const session = await auth();

  if (!session) throw new Error('User data not available!');

  if (!id) throw new Error('Content ID not available!');

  const content = await typedFetch<IContent>({
    url: `/content/${id}`,
    cache: 'no-cache',
  });

  const authorResponse = await typedFetch<IProfileUserResponse>({
    url: `/user/${content.authorId}`,
  });

  const authorName = getFirstName(authorResponse.user.userName);

  const comments = await typedFetch<IComment[]>({
    url: `/content/${id}/comment?viewerId=${session.user.id}`,
    cache: 'no-cache',
  });

  return (
    <section className="content-wrapper min-h-screen px-3.5 lg:px-5">
      <aside className="left-sidebar">
        <div className="right-sidebar-item rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="bg-white-100 flex items-center rounded">
              <Image
                src="/assets/icons/hart-violet.svg"
                width={25}
                height={25}
                alt="content stats"
                className="relative top-1 p-px "
              />
            </div>
            <p className="p2-medium !text-white-400">
              {content?.likesCount ? `${content.likesCount} Heart` : 'No likes'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white-200 dark:bg-black-700 flex items-center rounded">
              <Image
                src="/assets/icons/comments.svg"
                width={25}
                height={25}
                alt="Content stats"
                className="relative p-1"
              />
            </div>
            <p className="p2-medium !text-white-400">
              {content?.commentsCount
                ? `${content.commentsCount} Comments`
                : 'No comments'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white-200 dark:bg-black-700 flex size-6 items-center rounded">
              <Image
                src="/assets/icons/preview-gray.svg"
                width={25}
                height={25}
                alt="content stats"
                className="relative p-1"
              />
            </div>
            <p className="p2-medium !text-white-400">
              {content?.viewsCount ? `${content.viewsCount} Views` : 'No views'}
            </p>
          </div>
        </div>
        <ShareOnSocialNetworkDialog
          triggerBtn={
            <Button
              size="large"
              className="flex-center bg-white-100 shadow-card hover:bg-white-400/30 dark:bg-black-800 hover:dark:bg-black-700 cursor-pointer gap-2 rounded py-2 transition-colors"
            >
              <ShareIcon className="text-black-700 dark:text-white-300" />
              <p className="p3-medium">Share with</p>
            </Button>
          }
        />
        <div className="right-sidebar-item p2-medium !text-white-400 hidden rounded-2xl md:block ">
          <p>
            <span className="text-blue-500">{authorName} </span> Posted on{' '}
          </p>
          <p>{formatDate(content?.createdAt)}</p>
        </div>
      </aside>
      <ContentDetails
        viewerId={session.user.id}
        comments={comments}
        author={authorResponse.user}
        content={content}
      />
      <aside className="right-sidebar">
        <div className="right-sidebar-item items-center rounded-2xl">
          <Image
            src={
              authorResponse.user.avatarImg || '/assets/icons/image-preview.svg'
            }
            width={100}
            height={100}
            alt={authorResponse.user.userName}
            className="size-[100px] rounded-full"
          />
          <div>
            <h2 className="d2-bold">{authorResponse.user?.userName}</h2>
            <p className="p2-medium !text-white-400 text-center">
              @{getFirstName(authorResponse.user.userName)}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            {session.user.id !== content.authorId && (
              <FollowButton
                isFollowingInit={authorResponse.isFollowing}
                authorId={content.authorId}
                viewerId={session.user.id}
              />
            )}
            <Link
              href={`/profile/${authorResponse.user?.id}`}
              className="p3-bold border-white-100 bg-white-200 text-white-200 hover:bg-primary-500 hover:text-white-100 dark:border-black-700 dark:bg-black-700 dark:hover:bg-primary-500 w-full rounded-md border py-2 text-center transition-colors"
            >
              Visit Profile
            </Link>
          </div>
          <p className="p2-regular">
            joined {calculateTimeAgo(authorResponse.user?.createdAt)}
          </p>
        </div>
        <SidebarContentCard
          title={`More from ${authorResponse.user.userName}`}
          items={authorResponse.user.contents}
        />
      </aside>
    </section>
  );
};
export default ContentPage;
