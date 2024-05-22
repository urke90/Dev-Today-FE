'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { EQueryContentType } from '@/types/content';

// ----------------------------------------------------------------

interface IContentNavLinksProps {}

const ContentNavLinks: React.FC<IContentNavLinksProps> = (props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // staviti default value
  const type = searchParams.get('type') ?? EQueryContentType.POSTS;

  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);

    return params.toString();
  };

  const linkStyles =
    'p1-medium text-white-400 dark:text-white-300 py-2 px-3.5 rounded-[7px]';

  return (
    <div className="bg-light100__dark800 flex-between mx-auto w-full rounded-lg p-3.5">
      <Link
        href={pathname + '?' + updateQueryParams(EQueryContentType.POSTS)}
        className={`${linkStyles} ${
          type === EQueryContentType.POSTS
            ? 'bg-primary-500 !text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Posts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryContentType.MEETUPS)}
        className={`${linkStyles} ${
          type === EQueryContentType.MEETUPS
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Meetups
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams('podcasts')}
        className={`${linkStyles} ${
          type === EQueryContentType.PODCASTS
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Podcasts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryContentType.GROUPS)}
        className={`${linkStyles} ${
          type === EQueryContentType.GROUPS
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
