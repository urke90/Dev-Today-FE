'use client';

import { useEffect, useRef } from 'react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import HeartIcon from '../icons/Heart';
import BadgeItem from './BadgeItem';
import { Button } from '../ui/button';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

// ----------------------------------------------------------------

interface IPostItemCardProps {
  coverImage?: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  author: string;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  isLast: boolean;
  updatePageNumber: () => void;
}

const PostItemCard: React.FC<IPostItemCardProps> = ({
  coverImage,
  title,
  description,
  tags,
  viewsCount,
  likesCount,
  commentsCount,
  createdAt,
  isLast,
  updatePageNumber,
}) => {
  const listItemRef = useInfiniteScroll({ updatePageNumber, isLast });

  return (
    <li ref={listItemRef}>
      <Link
        href={`/`}
        className="flex md:items-center p-4 md:p-5 gap-4 bg-light100__dark800 rounded-2xl"
      >
        <CldImage
          src={coverImage || '/assets/images/no-image.svg'}
          width={165}
          height={165}
          alt={title}
          className="shrink-0 max-md:hidden self-baseline"
        />
        {/* RIGHT PART OF THE POST */}
        <div className="flex flex-col gap-4">
          <div className="flex mb-4 gap-2">
            <CldImage
              src={coverImage || '/assets/images/no-image.svg'}
              width={50}
              height={50}
              alt={title}
              className="shrink-0 md:hidden self-baseline"
            />
            <div>
              <p className="p1-bold mb-2">{title}</p>
              <p className="p3-regular line-clamp-1">{description}</p>
            </div>
            <Button
              className="size-[30px] bg-white-200 dark:bg-black-700 flex-center rounded-full shrink-0"
              onClick={() => alert('radi btn')}
            >
              <HeartIcon className="text-white-300" />
            </Button>
          </div>
          {tags.length > 0 ? (
            <ul className="flex gap-2.5">
              {tags.map((tag) => (
                <BadgeItem key={tag} title={tag} />
              ))}
            </ul>
          ) : null}
          <div className="flex-between flex-wrap gap-5">
            <div className="flex">
              <div className="bg-[#F0F1FE] rounded-full size-[40px] flex-center mr-2.5">
                <Image
                  src="/assets/images/avatars/avatar-1.svg"
                  width={28}
                  height={34}
                  alt="avatar"
                />
              </div>
              <div>
                <p className="p3-bold">Pavel Gvay</p>
                <p className="subtitle-normal">{createdAt.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-[30px] text-white-400 dark:text-white-300">
              {viewsCount && (
                <span className="p3-regular">{viewsCount} Views</span>
              )}
              {likesCount && (
                <span className="p3-regular">{likesCount} Likes</span>
              )}
              {commentsCount && (
                <span className="p3-regular">{commentsCount} comments</span>
              )}
            </div>
          </div>
        </div>
        {/* RIGHT PART OF THE POST */}
      </Link>
    </li>
  );
};

export default PostItemCard;
