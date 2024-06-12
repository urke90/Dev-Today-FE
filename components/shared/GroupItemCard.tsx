'use client';

import ShareIcon from '../icons/Share';
import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';

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
}

const GroupItemCard: React.FC<IGroupItemCardProps> = ({
  id,
  coverImage,
  title,
  description,
  members,
}) => {
  return (
    <li>
      <Link
        href={'/groups/' + id}
        className="bg-light100__dark800 flex-0 flex shrink-0 flex-col gap-3.5 rounded-2xl p-5"
      >
        <div className="relative h-[150px] w-full">
          <Image
            src={coverImage || '/assets/icons/image-preview.svg'}
            fill
            alt={title}
          />
        </div>
        <p className="p1-bold">{title}</p>
        <p className="p3-regular line-clamp-3">{description}</p>
        <div className="flex-between">
          <div className="ml-3 flex">
            {members?.slice(0, 4).map((member, index) => (
              <div
                key={index}
                className="flex-center -ml-3 size-[30px] rounded-full bg-[#F0F1FE]"
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
            <div className="cap-8 flex-center text-black-700 dark:bg-black-700 dark:text-white-100 -ml-3 size-[30px] rounded-full bg-[#F0F1FE]">
              {members?.length > 120 ? '120+' : members?.length}
            </div>
          </div>
          <Button
            variant="icon"
            className="bg-white-200 dark:bg-black-700 size-[30px] rounded-full"
          >
            <ShareIcon className="text-white-300" />
          </Button>
        </div>
      </Link>
    </li>
  );
};

export default GroupItemCard;
