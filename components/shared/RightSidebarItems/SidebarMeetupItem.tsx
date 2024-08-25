import BadgeItem from '../BadgeItem';

import Link from 'next/link';

import { type ITag } from '@/types/content';
import { parseDate } from '@/utils/format';

// ----------------------------------------------------------------

export interface ISidebarMeetupItemProps {
  title: string;
  meetupDate: Date | null;
  address: string | undefined;
  id: string;
  tags: ITag[];
}

const SidebarMeetupItem: React.FC<ISidebarMeetupItemProps> = ({
  id,
  address,
  meetupDate,
  tags,
  title,
}) => {
  const shortenedDate = meetupDate ? parseDate(meetupDate) : 'TBD';
  const [month, day] = shortenedDate.split(' ');

  return (
    <li>
      <Link
        href={'/content/' + id}
        className="sidebar-item-card-hover flex items-center gap-3.5"
      >
        <div className="flex-center bg-light200__dark700 h-[66px] w-[42px] shrink-0 flex-col rounded-[6px] px-2.5 py-[5px] ">
          <span className="subtitle-normal md:p4-regular break-keep uppercase text-black-800 dark:text-white-200">
            {month}
          </span>
          <span className="p2-bold md:d2-bold break-keep !text-primary-500">
            {day}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="p3-medium line-clamp-1">{title}</p>
          <p className="subtitle-normal">{address}</p>
          {tags?.length > 0 ? (
            <ul className="flex flex-wrap gap-2.5 ">
              {tags.slice(0, 3).map(({ id, title }) => (
                <BadgeItem key={id} title={title} />
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default SidebarMeetupItem;
