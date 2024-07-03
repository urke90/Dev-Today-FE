import { type ITag } from '@/types/content';
import { parseDate } from '@/utils/format';
import Link from 'next/link';
import BadgeItem from '../BadgeItem';

// ----------------------------------------------------------------

export interface ISidebarMeetupItemProps {
  title: string;
  meetupDate: Date | null;
  location: string;
  id: string;
  tags: ITag[];
}

const SidebarMeetupItem: React.FC<ISidebarMeetupItemProps> = ({
  id,
  location,
  meetupDate,
  tags,
  title,
}) => {
  const shortenedDate = meetupDate ? parseDate(meetupDate) : 'TBD';
  const [month, day] = shortenedDate.split(' ');

  return (
    <li>
      <Link href={'/content/' + id} className="flex items-center gap-3.5">
        <div className="flex-center bg-light200__dark700 shrink-0 flex-col rounded-[6px] px-2.5 py-[5px] h-[66px] w-[42px] ">
          <span className="subtitle-normal md:p4-regular text-black-800 dark:text-white-200 uppercase break-keep">
            {month}
          </span>
          <span className="p2-bold md:d2-bold !text-primary-500 break-keep">
            {day}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="p3-medium line-clamp-1">{title}</p>
          <p className="subtitle-normal">{location}</p>
          {tags?.length > 0 ? (
            <ul className="flex gap-2.5 flex-wrap ">
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
