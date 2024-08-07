import { auth } from '@/app/api/auth/[...nextauth]/route';
import ContentDetails from '@/components/content/ContentDetails';
import FollowButton from '@/components/content/FollowButton';
import ShareContent from '@/components/content/ShareContent';
import SidebarContentCard from '@/components/shared/RightSidebarItems/SidebarContentCard';
import type { IComment } from '@/lib/validation';
import type { IContent } from '@/types/content';
import type { IProfileUserResponse } from '@/types/user';
import { typedFetch } from '@/utils/api';
import { calculateTimeAgo, formatDate, getFirstName } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="content-wrapper px-4 !bg-white-200 dark:!bg-black-900 min-h-screen">
      <aside className="left-sidebar">
        <div className="right-sidebar-item rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white-100 rounded">
              <Image
                src="/assets/icons/hart-violet.svg"
                width={25}
                height={25}
                alt="content stats"
                className="relative top-1 p-[1px] "
              />
            </div>
            <p className="p2-medium !text-white-400">
              {content?.likesCount ? `${content.likesCount} Heart` : 'No likes'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white-200 dark:bg-black-700 rounded">
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
            <div className="flex items-center size-6 bg-white-200 dark:bg-black-700  rounded">
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
        <ShareContent />
        <div className="right-sidebar-item hidden md:block rounded-2xl p2-medium !text-white-400 ">
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
      <aside className="p1-bold right-sidebar w-full">
        <div className="flex flex-col right-sidebar-item rounded-2xl items-center">
          <Image
            src={
              authorResponse.user?.avatarImg || '/assets/images/no-image.svg'
            }
            width={100}
            height={100}
            alt="post example"
            className="rounded-full"
          />
          <h2 className="d2-bold">
            {authorResponse.user?.userName || 'No name'}
          </h2>
          <p className="p2-medium !text-white-400 lowercase">
            @{getFirstName(authorResponse.user.userName)}
          </p>
          {session.user.id !== content.authorId && (
            <FollowButton
              isFollowingInit={authorResponse.isFollowing}
              authorId={content.authorId}
              viewerId={session.user.id}
            />
          )}
          <Link
            href={`/profile/${authorResponse.user?.id}`}
            className="dark:bg-black-700 bg-white-200 border border-white-100 dark:border-black-700 text-white-200 py-2 w-full rounded-md text-center p3-bold hover:bg-primary-500 transition-colors dark:hover:bg-primary-500 hover:text-white-100"
          >
            Visit Profile
          </Link>
          <p className="p2-regular">
            joined {calculateTimeAgo(authorResponse.user?.createdAt)}
          </p>
        </div>
        <SidebarContentCard
          title={`More from ${authorResponse.user.userName}`}
          items={authorResponse.user.contents}
        />
      </aside>
    </div>
  );
};
export default ContentPage;
