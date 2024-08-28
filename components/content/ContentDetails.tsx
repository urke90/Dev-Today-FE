'use client';
import AudioPlayer from './AudioPlayer';
import Comments from './Comments';
import GoogleMapsMeetupDisplay from './GoogleMapsMeetupDisplay';
import HtmlParser from './HtmlParser';

import EditIcon from '../icons/Edit';
import BadgeItem from '../shared/BadgeItem';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { APIProvider } from '@vis.gl/react-google-maps';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { CLOUDINARY_URL } from '@/constants';
import { revalidateRoute } from '@/lib/actions/revalidate';
import type { IComment } from '@/lib/validation';
import { EContentType, type IContent } from '@/types/content';
import type { IProfileUser } from '@/types/user';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

interface IContentDetailsProps {
  content: IContent;
  viewerId: string;
  comments: IComment[];
  author: IProfileUser;
}

const buildRevalidateAndRedirectRoute = (type: EContentType) => {
  if (type === EContentType.POST) {
    return '/posts';
  } else if (type === EContentType.MEETUP) {
    return '/meetups';
  }

  return '/podcasts';
};

const ContentDetails: React.FC<IContentDetailsProps> = ({
  content,
  viewerId,
  author,
  comments,
}) => {
  const router = useRouter();

  const transformedAvatarImg = author.avatarImg.startsWith(CLOUDINARY_URL)
    ? getCldImageUrl({
        width: 72,
        height: 72,
        src: author.avatarImg,
        crop: 'fill',
      })
    : author.avatarImg;

  const handleDeleteContent = async () => {
    try {
      await typedFetch({
        url: `/content/${content.id}/delete`,
        method: 'DELETE',
        body: { viewerId },
      });
      toast.success('Deleted successfully');

      const route = buildRevalidateAndRedirectRoute(content.type);
      revalidateRoute(route);
      router.push(route);
    } catch (error) {
      console.log('Error deleting content FE', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <main className="main-content space-y-5">
      {content.type === EContentType.PODCAST && (
        <AudioPlayer
          audioSrc={content.podcastFile!}
          title={content.title}
          audioTitle={content.podcastTitle!}
          coverImage={content.coverImage!}
        />
      )}
      {content.type === EContentType.POST && (
        <div
          className={`relative h-24 w-full md:h-44 ${!content.coverImage ? 'flex-center rounded-[10px] bg-primary-100 dark:bg-black-700' : ''}`}
        >
          {content.coverImage ? (
            <Image
              fill
              src={content.coverImage}
              alt={content.title}
              className="rounded-[10px] object-cover"
            />
          ) : (
            <Image
              src="/assets/icons/image-preview.svg"
              width={40}
              height={40}
              alt={content.title}
              className="rounded-[10px]"
            />
          )}
        </div>
      )}
      {content.type === EContentType.MEETUP && content.meetupLocation && (
        <div className="h-60">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          >
            <GoogleMapsMeetupDisplay location={content.meetupLocation} />
          </APIProvider>
        </div>
      )}
      <div className="bg-light100__dark800 flex flex-col gap-5 rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between">
          {content.type === EContentType.MEETUP && (
            <div className="flex max-w-3xl gap-2">
              <Image
                src={transformedAvatarImg || '/assets/icons/image-preview.svg'}
                alt="avatar"
                width={72}
                height={72}
                className="rounded-md"
              />
              <h2 className="d2-bold">{content?.title}</h2>
            </div>
          )}
          {content?.type !== EContentType.MEETUP && (
            <h2 className="d2-bold overflow-wrap overflow-hidden text-wrap break-words">
              {content.title}
            </h2>
          )}
          {content.authorId === viewerId && (
            <DropdownMenu>
              <Trigger asChild>
                <Button className="w-auto">
                  <Image
                    src="/assets/icons/menu-vertical.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                  />
                </Button>
              </Trigger>
              <Portal>
                <Content
                  avoidCollisions
                  collisionPadding={15}
                  sideOffset={8}
                  align="end"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className="bg-light200__dark700 shadow-header-menu z-20 mb-4 flex w-40 flex-col gap-2.5 rounded-[10px] px-5 py-4 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                >
                  <Item
                    onSelect={() => router.push(`/content/${content?.id}/edit`)}
                    className="dropdown-item"
                  >
                    <EditIcon />
                    <p>Edit Post</p>
                  </Item>
                  <Item
                    onSelect={(e) => e.preventDefault()}
                    onClick={handleDeleteContent}
                    className="dropdown-item !text-error-text "
                  >
                    <Image
                      src="/assets/icons/trash.svg"
                      width={18}
                      height={18}
                      alt="Delete"
                    />
                    Delete Post
                  </Item>
                </Content>
              </Portal>
            </DropdownMenu>
          )}
        </div>
        <ul className="flex flex-wrap gap-2">
          {content?.tags.map(({ id, title }) => (
            <BadgeItem key={id} title={title} />
          ))}
        </ul>
        <div className="break-words">
          <HtmlParser data={content?.description} />
        </div>
        {content.type === EContentType.MEETUP && (
          <>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar-primary.svg"
                alt="Preview"
                width={20}
                height={20}
              />
              <p className="p3-medium">
                {content?.meetupDate &&
                  new Date(content.meetupDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                  })}
              </p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/location-primary.svg"
                alt="Preview"
                width={20}
                height={20}
              />
              <p className="p3-medium">{content?.meetupLocation?.address}</p>
            </div>
          </>
        )}
      </div>
      <Comments
        contentId={content.id}
        viewerId={viewerId}
        comments={comments}
      />
    </main>
  );
};

export default ContentDetails;
