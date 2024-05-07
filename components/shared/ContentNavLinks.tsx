'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------

interface IContentNavLinksProps {}

const ContentNavLinks: React.FC<IContentNavLinksProps> = (props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // staviti default value
  const contentType = searchParams.get('contentType') ?? 'posts';

  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('contentType', value);

    return params.toString();
  };

  const linkStyles =
    'p1-medium text-white-400 dark:text-white-300 py-2 px-3.5 rounded-[7px]';

  return (
    <div className="bg-light100__dark800 flex-between p-3.5 rounded-lg">
      <Link
        href={pathname + '?' + updateQueryParams('posts')}
        className={`${linkStyles} ${
          contentType === 'posts'
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Posts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams('meetups')}
        className={`${linkStyles} ${
          contentType === 'meetups'
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Meetups
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams('podcasts')}
        className={`${linkStyles} ${
          contentType === 'podcasts'
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Podcasts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams('groups')}
        className={`${linkStyles} ${
          contentType === 'groups'
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
