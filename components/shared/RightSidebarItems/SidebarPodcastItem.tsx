import ArrowRightIcon from '@/components/icons/ArrowRight';
import { EContentType } from '@/types/content';
import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

export interface ISidebarPodcastItemProps {
  title: string;
  description: string;
  id: string;
  type: EContentType;
  author: {
    name: string;
    avatarImg: string;
  };
}

const SidebarPodcastItem: React.FC<ISidebarPodcastItemProps> = ({
  id,
  title,
  type,
  description,
  author,
}) => {
  return (
    <li>
      <Link href={type + '/' + id} className="flex items-center gap-3.5">
        <Image
          src={author.avatarImg || '/assets/icons/image-preview.svg'}
          width={58}
          height={58}
          alt={author.name}
          className="rounded-[6px] shrink-0"
        />
        <div className="flex flex-col gap-1.5">
          <p className="p3-medium line-clamp-1">{title}</p>
          <p className="subtitle-normal">{description}</p>
        </div>
        <ArrowRightIcon className="text-white-400 shrink-0" />
      </Link>
    </li>
  );
};

export default SidebarPodcastItem;
