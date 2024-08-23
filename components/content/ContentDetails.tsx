'use client';
import { Button } from '@/components/ui/button';
import { IComment } from '@/lib/validation';
import { EContentType, IContent } from '@/types/content';
import { IProfileUser } from '@/types/user';
import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import EditIcon from '../icons/Edit';
import AudioPlayer from './AudioPlayer';
import Comments from './Comments';
import HtmlParser from './HtmlParser';

import { CLOUDINARY_URL } from '@/constants';
import { APIProvider } from '@vis.gl/react-google-maps';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BadgeItem from '../shared/BadgeItem';
import GoogleMapsMeetupDisplay from './GoogleMapsMeetupDisplay';

// ----------------------------------------------------------------

interface IContentDetailsProps {
  content: IContent;
  viewerId: string;
  comments: IComment[];
  author: IProfileUser;
}

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
          className={`relative w-full h-24 md:h-44 ${!content.coverImage ? 'flex-center bg-primary-100 dark:bg-black-700 rounded-[10px]' : ''}`}
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
      {content.type === EContentType.MEETUP && (
        <div className="h-60">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          >
            <GoogleMapsMeetupDisplay location={content.meetupLocation} />
          </APIProvider>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex items-center bg-white-100 border border-red-800 justify-between">
          {content.type === EContentType.MEETUP && (
            <div className="flex gap-2 max-w-3xl">
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
            <h2 className="d2-bold text-wrap break-words overflow-wrap overflow-hidden">
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
                  className="bg-light100__dark800 px-2 !w-48 shadow-header-menu data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex flex-col gap-2.5 rounded-[10px] py-4 "
                >
                  <Item
                    onSelect={() => router.push(`/content/${content?.id}/edit`)}
                    className="flex items-center gap-2.5 focus-visible:outline-none p3-medium cursor-pointer px-3 py-1 rounded-md"
                  >
                    <EditIcon />
                    <p>Edit Post</p>
                  </Item>
                  <Item
                    onSelect={(e) => e.preventDefault()}
                    className="flex items-center focus-visible:outline-none gap-2.5 p3-medium px-3 py-1.5 !text-error-text rounded-md cursor-pointer"
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
        commentAuthorId={viewerId}
        comments={comments}
      />
    </main>
  );
};

export default ContentDetails;
