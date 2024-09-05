'use client';

import BadgeItem from './BadgeItem';

import parse from 'html-react-parser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { ITag } from '@/types/content';
import { parseDate } from '@/utils/format';

// ----------------------------------------------------------------

interface IMeetupItemCardProps {
  id: string;
  title: string;
  coverImage: string | null;
  address: string | undefined;
  meetupDate: Date | null;
  description: string;
  tags: ITag[];
}

const MeetupItemCard: React.FC<IMeetupItemCardProps> = ({
  id,
  coverImage,
  address,
  title,
  meetupDate,
  description,
  tags,
}) => {
  const shortenedDate = meetupDate ? parseDate(meetupDate) : 'TBD';
  const [month, day] = shortenedDate.split(' ');
  const router = useRouter();

  return (
    <li
      onClick={() => router.push('/content/' + id)}
      className="bg-light100__dark800 shadow-card flex cursor-pointer flex-col gap-2.5 rounded-[10px] px-3.5 py-5"
    >
      <div className="flex-between flex">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative size-[56px] shrink-0 md:size-[72px]">
            <Image
              src={coverImage || '/assets/icons/image-preview.svg'}
              alt="meetup"
              fill
              className="size-[56px] md:size-[72px]"
            />
          </div>
          <div>
            <p className="lg:p1-bold p3-bold">{title}</p>
            <p className="lg:p3-regular subtitle-normal">{address}</p>
          </div>
        </div>
        <div className="flex-center bg-light200__dark700 h-[56px] w-[38px] shrink-0 flex-col rounded-[6px] px-2.5 py-[5px] md:h-[58px] md:w-[54px]">
          <span className="subtitle-normal md:p4-regular text-black-800 dark:text-white-200 uppercase">
            {month}
          </span>
          <span className="p2-bold md:d2-bold !text-primary-500">{day}</span>
        </div>
      </div>
      <div className="p4-regular md:p3-regular line-clamp-2">
        {parse(description)}
      </div>
      {tags?.length > 0 ? (
        <ul className="flex flex-wrap gap-2.5">
          {tags.map(({ id, title }) => (
            <BadgeItem key={id} title={title} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default MeetupItemCard;
