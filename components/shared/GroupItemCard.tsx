'use client';

import ShareOnSocialNetworkDialog from './ShareOnSocialNetworkDialog';

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
    id?: string;
    avatarImg: string | null;
  }[];
  totalMembers: number | null;
}

const GroupItemCard: React.FC<IGroupItemCardProps> = ({
  id,
  coverImage,
  title,
  description,
  members,
  totalMembers,
}) => {
  return (
    <li>
      <Link
        href={'/groups/' + id}
        className="bg-light100__dark800 flex-0 shadow-card flex shrink-0 flex-col gap-3.5 rounded-2xl p-5"
      >
        <div className="relative h-[150px] w-full">
          <Image
            src={coverImage || '/assets/icons/image-preview.svg'}
            fill
            alt={title}
            className="object-cover"
          />
        </div>
        <p className="p1-bold">{title}</p>
        <p className="p3-regular line-clamp-3">{description}</p>
        <div className="flex-between">
          <div className="ml-3 flex">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex-center bg-white-600 -ml-3 size-[30px] rounded-full"
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
            <div className="cap-8 flex-center bg-white-600 text-black-700 dark:bg-black-700 dark:text-white-100 -ml-3 size-[30px] rounded-full">
              {totalMembers && totalMembers > 120 ? '120+' : totalMembers}
            </div>
          </div>
          <ShareOnSocialNetworkDialog
            triggerBtn={
              <Button
                variant="icon"
                className="bg-white-200 dark:bg-black-700 size-[30px] rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.preventDefault();
                }}
              >
                <ShareIcon className="text-white-300" />
              </Button>
            }
            customUrl={`/groups${id}`}
          />
        </div>
      </Link>
    </li>
  );
};

export default GroupItemCard;
