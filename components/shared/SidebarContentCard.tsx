import type { IUserRecentContent } from '@/types/user';
import ArrowRightIcon from '../icons/ArrowRight';

import { EContentType } from '@/types/content';
import { parseDate } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';
import BadgeItem from './BadgeItem';

// ----------------------------------------------------------------

interface ISidebarContentCardProps {
  title: string;
  items: IUserRecentContent[];
}

/**
 * This card will be used for rendering PODCAST or POST items in the right sidebar.
 * For Meetups, use MeetupItemCard instead.
 */
const SidebarContentCard: React.FC<ISidebarContentCardProps> = ({
  title,
  items,
}) => {
  return (
    <div className="right-sidebar-item">
      <div className="flex items-center gap-[3px]">
        <p className="p2-bold">{title}</p>
        <ArrowRightIcon className="text-black-800 dark:text-white-200" />
      </div>
      <ul className="flex flex-col gap-5">
        {items?.length > 0
          ? items.map(
              ({
                id,
                author,
                description,
                coverImage,
                meetupDate,
                tags,
                title,
                type,
              }) => {
                switch (type) {
                  case EContentType.POST: {
                    return (
                      <PostItemCard
                        key={id}
                        id={id}
                        coverImage={coverImage}
                        title={title}
                        author={author.name}
                        type={type}
                      />
                    );
                  }
                  case EContentType.MEETUP: {
                    return (
                      <MeetupItemCard
                        key={id}
                        id={id}
                        location="LOCATION IS HARDCODED FOR NOW"
                        title={title}
                        tags={tags}
                        type={type}
                        meetupDate={meetupDate}
                      />
                    );
                  }
                  case EContentType.PODCAST: {
                    return (
                      <PodcastItemCard
                        key={id}
                        id={id}
                        author={author}
                        description={description}
                        tags={tags}
                        title={title}
                        type={type}
                      />
                    );
                  }
                  default:
                    return <p className="p3-bold">Type is not supported!</p>;
                }
              }
            )
          : null}
      </ul>
    </div>
  );
};

interface IPostItemCardProps {
  coverImage: string | null;
  title: string;
  author: string;
  id: string;
  type: EContentType;
}

const PostItemCard: React.FC<IPostItemCardProps> = ({
  id,
  coverImage,
  title,
  author,
  type,
}) => {
  return (
    <li>
      <Link href={type + '/' + id} className="flex justify-between ">
        <div className="flex gap-3.5">
          <Image
            src={coverImage || '/assets/images/no-image.svg'}
            alt="post"
            width={58}
            height={58}
            className="rounded bg-primary-100 dark:bg-primary-500"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="p4-medium">{title}</p>
            <p className="subtitle-normal">By {author}</p>
          </div>
        </div>

        <ArrowRightIcon className="text-white-400 shrink-0" />
      </Link>
    </li>
  );
};

interface IMeetupItemCardProps {
  title: string;
  meetupDate: Date | null;
  location: string;
  id: string;
  tags: string[];
  type: EContentType;
}

const MeetupItemCard: React.FC<IMeetupItemCardProps> = ({
  id,
  location,
  meetupDate,
  tags,
  title,
  type,
}) => {
  const shortenedDate = meetupDate ? parseDate(meetupDate) : 'TBD';
  const [month, day] = shortenedDate.split(' ');

  return (
    <li>
      <Link href={type + '/' + id} className="flex items-center gap-3.5">
        <div className="flex-center bg-light200__dark700 shrink-0 flex-col rounded-[6px] px-2.5 py-[5px] h-[66px] w-[42px]">
          <span className="subtitle-normal md:p4-regular text-black-800 dark:text-white-200 uppercase">
            {month}
          </span>
          <span className="p2-bold md:d2-bold !text-primary-500">{day}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="p3-medium line-clamp-1">{title}</p>
          <p className="subtitle-normal">{location}</p>
          {tags?.length > 0 ? (
            <ul className="flex gap-2.5">
              {tags.map((tag) => (
                <BadgeItem key={tag} title={tag} />
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

interface IPodcastItemCardProps {
  title: string;
  description: string;
  id: string;
  tags: string[];
  type: EContentType;
  author: {
    name: string;
    avatarImg: string;
  };
}

const PodcastItemCard: React.FC<IPodcastItemCardProps> = ({
  id,
  tags,
  title,
  type,
  description,
  author,
}) => {
  return (
    <li>
      <Link href={type + '/' + id} className="flex items-center gap-3.5">
        <div className="flex">
          <Image
            src={author.avatarImg || '/assets/images/no-image.svg'}
            width={58}
            height={58}
            alt={author.name}
            className="bg-primary-100 dark:bg-primary-500 rounded-[6px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="p3-medium line-clamp-1">{title}</p>
          <p className="subtitle-normal">{description}</p>
          {tags?.length > 0 ? (
            <ul className="flex gap-2.5">
              {tags.map((tag) => (
                <BadgeItem key={tag} title={tag} />
              ))}
            </ul>
          ) : null}
        </div>
        <ArrowRightIcon className="text-white-400 shrink-0" />
      </Link>
    </li>
  );
};

export default SidebarContentCard;
