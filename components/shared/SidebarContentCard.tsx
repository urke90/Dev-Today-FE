import type { IRecentContent } from '@/types/user';
import ArrowRightIcon from '../icons/ArrowRight';

import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

interface ISidebarContentCardProps {
  title: string;
  author: string;
  items: IRecentContent[];
}

/**
 * This card will be used for rendering PODCAST or POST items in the right sidebar.
 * For Meetups, use MeetupItemCard instead.
 */
const SidebarContentCard: React.FC<ISidebarContentCardProps> = ({
  title,
  items,
  author,
}) => {
  return (
    <div className="right-sidebar-item">
      <div className="flex items-center gap-[3px]">
        <p className="p2-bold">{title}</p>
        <ArrowRightIcon className="text-black-800 dark:text-white-200" />
      </div>
      <ul className="flex flex-col gap-5">
        {items.length > 0
          ? items.map(({ id, title, coverImage }) => (
              <SidebarContentCardItem
                key={id}
                coverImage={coverImage}
                title={title}
                author={author}
                link={id}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

interface ISidebarContentCardItemProps {
  coverImage: string | null;
  title: string;
  author: string;
  link: string;
}

const SidebarContentCardItem: React.FC<ISidebarContentCardItemProps> = ({
  coverImage,
  title,
  author,
  link,
}) => {
  return (
    <li>
      <Link href={link} className="flex">
        <div className="flex gap-3.5">
          <Image
            src={coverImage || '/assets/images/no-image.svg'}
            alt="post"
            width={58}
            height={58}
            className="rounded"
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

export default SidebarContentCard;
