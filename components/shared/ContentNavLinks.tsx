'use client';

import Link from 'next/link';
import { EContentType } from '@/types/content';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------

interface IContentNavLinksProps {}

const ContentNavLinks: React.FC<IContentNavLinksProps> = (props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // staviti default value
  const type = searchParams.get('type') ?? EContentType.POSTS;

  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);

    return params.toString();
  };

  const linkStyles =
    'p1-medium text-white-400 dark:text-white-300 py-2 px-3.5 rounded-[7px]';

  return (
    <div className="bg-light100__dark800 flex-between p-3.5 rounded-lg mx-auto w-full">
      <Link
        href={pathname + '?' + updateQueryParams(EContentType.POSTS)}
        className={`${linkStyles} ${
          type === EContentType.POSTS
            ? 'bg-primary-500 !text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Posts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EContentType.MEETUPS)}
        className={`${linkStyles} ${
          type === EContentType.MEETUPS
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Meetups
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams('podcasts')}
        className={`${linkStyles} ${
          type === EContentType.PODCASTS
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Podcasts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EContentType.GROUPS)}
        className={`${linkStyles} ${
          type === EContentType.GROUPS
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Groups
      </Link>
    </div>
  );
};

export default ContentNavLinks;
