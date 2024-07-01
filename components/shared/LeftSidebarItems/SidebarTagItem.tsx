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
        className={`flex gap-2.5 hover-sidebar-items rounded-md ${selectedTag === title.toLowerCase() ? 'dark:bg-black-700 bg-[#F8FAFC]' : ''}`}
      >
        <div className="flex-center size-8 bg-[#80A9FF1A] dark:bg-[#80A9FF1A] rounded">
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
