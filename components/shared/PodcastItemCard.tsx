'use client';

import BadgeItem from './BadgeItem';

import HeartIcon from '../icons/Heart';
import { Button } from '../ui/button';

import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

import type { ITag } from '@/types/content';
import { calculateTimeAgo, generateRandomAvatarImgIndex } from '@/utils/format';

// ----------------------------------------------------------------

interface IPodcastItemCardProps {
  id: string;
  coverImage: string | null;
  title: string;
  description: string;
  tags: ITag[];
  author: {
    userName: string;
    avatarImg: string | null;
  };
  createdAt: Date;
  isLiked: boolean;
  handleLikeContent: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => Promise<void>;
  handleDislikeContent: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => Promise<void>;
}

const PodcastItemCard: React.FC<IPodcastItemCardProps> = ({
  id,
  coverImage,
  title,
  description,
  tags,
  author,
  createdAt,
  isLiked,
  handleLikeContent,
  handleDislikeContent,
}) => {
  return (
    <li>
      <Link
        href={'/content/' + id}
        className="bg-light100__dark800 shadow-card flex flex-col gap-3.5 rounded-[10px] px-3.5 py-5 lg:gap-[18px] lg:rounded-2xl lg:p-4"
      >
        <div className="flex-between">
          <div className="flex gap-2">
            <Image
              src={coverImage || '/assets/icons/image-preview.svg'}
              width={50}
              height={50}
              alt={title}
            />
            <p className="p3-bold lg:p1-bold line-clamp-2">{title}</p>
          </div>
          <Button
            type="button"
            variant="icon"
            className="like-btn-scale-hover bg-white-200 dark:bg-black-700 size-[30px] shrink-0 rounded-full"
            onClick={(e) =>
              isLiked ? handleLikeContent(e, id) : handleDislikeContent(e, id)
            }
          >
            <HeartIcon
              className={isLiked ? 'text-primary-500' : 'text-white-300'}
            />
          </Button>
        </div>
        <div className="p4-regular lg:p3-regular line-clamp-3 lg:line-clamp-4">
          {parse(description)}
        </div>
        {tags?.length > 0 ? (
          <ul className="flex flex-wrap gap-2.5">
            {tags.map(({ id, title }) => (
              <BadgeItem key={id} title={title} />
            ))}
          </ul>
        ) : null}
        <div className="flex items-center gap-[7px] lg:gap-2.5">
          <div className="flex-center bg-white-300 dark:bg-white-600 relative size-[30px] rounded-full lg:size-[40px]">
            <Image
              fill
              src={
                author.avatarImg ||
                `/assets/images/avatars/avatar-${generateRandomAvatarImgIndex()}.svg`
              }
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="p4-bold lg:p3-bold">{author.userName}</span>
            <span className="subtitle-normal">
              {calculateTimeAgo(createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PodcastItemCard;
