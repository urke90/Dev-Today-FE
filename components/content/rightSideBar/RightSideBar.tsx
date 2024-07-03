'use client';
import { Button } from '@/components/ui/button';
import { revalidateRoute } from '@/lib/actions/revalidate';
import { IContent } from '@/types/content';
import { IProfileUser } from '@/types/user';
import { typedFetch } from '@/utils/api';
import { calculateTimeAgo, getFirstName } from '@/utils/format';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type RightSidebarProps = {
  contentDetails: IContent;
  commentAuthorId: string;
  getAuthorDetails: {
    isFollowing: boolean;
    user: IProfileUser;
  };
};

const RightSideBar = ({
  getAuthorDetails,
  contentDetails,
  commentAuthorId,
}: RightSidebarProps) => {
  console.log(getAuthorDetails);

  const handleFollow = async () => {
    try {
      await typedFetch({
        url: `/user/${contentDetails.authorId}/follow`,
        method: 'POST',
        body: {
          userId: commentAuthorId,
        },
      });
      revalidateRoute(`/user/${contentDetails.authorId}`);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to follow user');
    }
  };
  return (
    <aside className="p1-bold right-sidebar w-full">
      <div className="flex flex-col bg-light200__dark800 rounded-2xl items-center p-4 space-y-5">
        <Image
          src={
            getAuthorDetails.user?.avatarImg || '/assets/images/no-image.svg'
          }
          width={100}
          height={100}
          alt="post example"
          className="rounded-full"
        />
        <h2 className="d2-bold">
          {getAuthorDetails.user?.userName || 'No name'}
        </h2>
        <p className="p2-medium !text-white-400 lowercase">
          @{getFirstName(getAuthorDetails.user.userName) || 'No username'}
        </p>
        {commentAuthorId !== contentDetails.authorId && (
          <Button
            onClick={handleFollow}
            className="dark:bg-black-900 bg-white-100 hover:bg-white-300/30 hover:dark:bg-black-700 text-purple-500 py-[10px] rounded "
          >
            {getAuthorDetails?.isFollowing ? 'Fallowing' : 'Follow'}
          </Button>
        )}
        <Link
          href={`/profile/${getAuthorDetails.user?.id}`}
          className="dark:bg-black-900 bg-white-100 hover:bg-white-300/30 hover:dark:bg-black-700 text-purple-500 p3-bold py-[10px] rounded  w-full text-center"
        >
          Visit Profile
        </Link>
        <p className="p2-regular">
          joined {calculateTimeAgo(getAuthorDetails.user?.createdAt)}
        </p>
      </div>
      <div className="bg-light100__dark800 p-5 rounded-2xl">
        <div className="flex gap-2 items-center">
          <h3>More from {getAuthorDetails.user?.userName || 'No name'}</h3>
          <ArrowRight size={20} />
        </div>
        <div className="flex flex-col space-y-5 mt-5">
          {getAuthorDetails.user?.contents.map((content) => (
            <Link
              key={content.id}
              href={`${content.id}`}
              className="flex w-full gap-3"
            >
              <Image
                src={content.coverImage || '/assets/images/no-image.svg'}
                alt="post"
                width={58}
                height={58}
                className="rounded bg-primary-100 w-1/5 dark:bg-primary-500"
              />
              <div className="w-3/5 overflow-hidden space-y-2">
                <h4 className="p4-medium capitalize">{content.title}...</h4>
                <p className="subtitle-normal">
                  {' '}
                  <span>by </span>
                  {content.author.userName}
                </p>
              </div>
              <ArrowRight size={20} className="ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
