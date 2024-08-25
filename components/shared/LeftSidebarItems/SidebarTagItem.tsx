'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------

interface ISidebarTagItemProps {
  title: string;
  postCount: number;
  index: number;
  selectedTag: string;
}

const SidebarTagItem: React.FC<ISidebarTagItemProps> = ({
  title,
  index,
  postCount,
  selectedTag,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleUpdateTagParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const existingTagParam = params.get('tag');

    if (existingTagParam?.toLowerCase() === value.toLowerCase()) {
      params.delete('tag');
    } else {
      params.set('tag', value.toLowerCase());
    }

    return params.toString();
  };

  return (
    <li>
      <Link
        href={pathname + '?' + handleUpdateTagParams(title.toLowerCase())}
        className={`hover-sidebar-items flex gap-2.5 rounded-md ${selectedTag === title.toLowerCase() ? 'bg-[#F8FAFC] dark:bg-black-700' : ''}`}
      >
        <div className="flex-center size-8 rounded bg-[#80A9FF1A] dark:bg-[#80A9FF1A]">
          <Image
            src={`/assets/icons/tags/tag-${index}.svg`}
            width={20}
            height={20}
            alt={title}
            className="shrink-0 rounded"
          />
        </div>
        <div>
          <p className="p4-medium line-clamp-1">#{title}</p>
          <p className="subtitle-normal line-clamp-1">
            {postCount} Posted by this tag
          </p>
        </div>
      </Link>
    </li>
  );
};

export default SidebarTagItem;
