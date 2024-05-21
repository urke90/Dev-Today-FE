'use client';

import { CldImage } from 'next-cloudinary';
import BadgeItem from './BadgeItem';
import HeartIcon from '../icons/Heart';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

// ----------------------------------------------------------------

interface IPodcastItemCardProps {
  id: string;
  coverImage?: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: Date;
}

const PodcastItemCard: React.FC<IPodcastItemCardProps> = ({
  id,
  coverImage,
  title,
  description,
  tags,
  author,
  createdAt,
}) => {
  return (
    <li>
      <Link
        href={'/podcasts/' + id}
        className="flex flex-col gap-3.5 lg:gap-[18px] py-5 px-3.5 lg:p-4 bg-light100__dark800 rounded-[10px] lg:rounded-2xl"
      >
        <div className="flex gap-2 lg:flex-between">
          <CldImage
            src={coverImage || '/assets/images/no-image.svg'}
            width={50}
            height={50}
            alt={title}
          />
          <p className="p3-bold lg:p1-bold line-clamp-2">{title}</p>
          <Button
            variant="icon"
            className="dark:bg-black-700 bg-white-200 size-[30px] shrink-0 rounded-full"
          >
            {/* TODO: HOW TO MAKE THIS ICON RESIZE ON DIFFERENT VIEWPORTS */}
            <HeartIcon className="text-white-300" />
          </Button>
        </div>
        <p className="p4-regular lg:p3-regular line-clamp-3 lg:line-clamp-4">
          {description}
        </p>
        {tags.length > 0 ? (
          <ul className="flex gap-2.5">
            {tags.map((tag) => (
              <BadgeItem key={tag} title={tag} />
            ))}
          </ul>
        ) : null}
        <div className="flex items-center gap-[7px] lg:gap-2.5">
          <div className="relative size-[30px] bg-white-300 dark:bg-[#F0F1FE] lg:size-[40px] rounded-full flex-center">
            <Image
              fill
              src="/assets/images/avatars/avatar-1.svg"
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="p4-bold lg:p3-bold">{author}</span>
            <span className="subtitle-normal">
              {createdAt.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PodcastItemCard;
