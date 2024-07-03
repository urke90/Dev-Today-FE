import ArrowRightIcon from '@/components/icons/ArrowRight';
import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

export interface ISidebarPodcastItemProps {
  title: string;
  coverImage: string | null;
  id: string;
  author: string;
}

const SidebarPodcastItem: React.FC<ISidebarPodcastItemProps> = ({
  id,
  title,
  coverImage,
  author,
}) => {
  return (
    <li>
      <Link
        href={'/content/' + id}
        className="flex-between items-center gap-3.5">
        <div className="flex items-center gap-3.5">
          <Image
            src={coverImage || '/assets/icons/image-preview.svg'}
            width={58}
            height={58}
            alt={author}
            className="rounded-[6px] shrink-0"
          />
          <div className="flex flex-col gap-1.5">
            <p className="p3-medium line-clamp-1">{title}</p>
            <p className="subtitle-normal">by {author}</p>
          </div>
        </div>
        <ArrowRightIcon className="text-white-400 shrink-0" />
      </Link>
    </li>
  );
};

export default SidebarPodcastItem;
