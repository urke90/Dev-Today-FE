'use client';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import ShareIcon from '../icons/Share';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

// ----------------------------------------------------------------

interface IGroupItemCardProps {
  id: string;
  coverImage: string;
  title: string;
  description: string;
  members: {
    id: string;
    avatarImg?: string;
  }[];
  isLast: boolean;
  updatePageNumber: () => void;
}

const GroupItemCard: React.FC<IGroupItemCardProps> = ({
  id,
  coverImage,
  title,
  description,
  members,
  updatePageNumber,
  isLast,
}) => {
  const listItemRef = useInfiniteScroll({ updatePageNumber, isLast });
  return (
    <li ref={listItemRef}>
      <Link
        href={'/groups/' + id}
        className="flex flex-col bg-light100__dark800 p-5 rounded-2xl gap-3.5 flex-0 shrink-0"
      >
        <div className="relative w-full h-[150px]">
          <CldImage
            src={coverImage || '/assets/images/no-image.svg'}
            fill
            // crop="fill"
            alt={title}
            className="rounded-xl object-fill"
          />
        </div>
        <p className="p1-bold">{title}</p>
        <p className="p3-regular line-clamp-3">{description}</p>
        <div className="flex-between">
          <div className="flex ml-3">
            {members.slice(0, 4).map((member, index) => (
              <div
                key={index}
                className="size-[30px] bg-[#F0F1FE] rounded-full flex-center -ml-3"
              >
                <Image
                  width={22}
                  height={22}
                  src={
                    member.avatarImg ||
                    `/assets/images/avatars/avatar-${index + 1}.svg`
                  }
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
            ))}
            <div className="size-[30px] bg-[#F0F1FE] dark:bg-black-700 cap-8 text-black-700 dark:text-white-100 rounded-full flex-center -ml-3">
              {members.length > 120 ? `120+` : members.length}
            </div>
          </div>
          <Button
            variant="icon"
            className="size-[30px] bg-white-200 dark:bg-black-700 rounded-full"
          >
            <ShareIcon className="text-white-300" />
          </Button>
        </div>
      </Link>
    </li>
  );
};

export default GroupItemCard;
