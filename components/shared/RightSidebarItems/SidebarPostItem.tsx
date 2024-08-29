import Image from 'next/image';
import Link from 'next/link';

import ArrowRightIcon from '@/components/icons/ArrowRight';

// ----------------------------------------------------------------

export interface ISidebarPostItemProps {
  coverImage: string | null;
  title: string;
  author: string;
  id: string;
}

const SidebarPostItem: React.FC<ISidebarPostItemProps> = ({
  id,
  coverImage,
  title,
  author,
}) => {
  return (
    <li>
      <Link
        href={'/content/' + id}
        className="sidebar-item-card-hover flex justify-between"
      >
        <div className="flex items-center gap-3.5">
          <Image
            src={coverImage || '/assets/icons/image-preview.svg'}
            alt={title}
            width={58}
            height={58}
            className="size-[58px] shrink-0 rounded"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="p4-medium">{title}</p>
            <p className="subtitle-normal">By {author}</p>
          </div>
        </div>

        <ArrowRightIcon className="text-white-400 shrink-0" />
      </Link>
    </li>
  );
};

export default SidebarPostItem;
