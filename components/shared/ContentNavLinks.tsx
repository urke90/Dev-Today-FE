'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { EQueryContentType } from '@/types/content';

// ----------------------------------------------------------------

interface IContentNavLinksProps {
  isGroupPage?: boolean;
}

const ContentNavLinks: React.FC<IContentNavLinksProps> = ({
  isGroupPage = false,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // staviti default value
  const type = searchParams.get('type') ?? EQueryContentType.POST;

  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);

    return params.toString();
  };

  const linkStyles =
    'p1-medium text-white-400 dark:text-white-300 py-2 px-3.5 rounded-[7px]';

  return (
    <div className="bg-light100__dark800 flex-between mx-auto w-full rounded-lg p-3.5 shadow-card">
      <Link
        href={pathname + '?' + updateQueryParams(EQueryContentType.POST)}
        className={`${linkStyles} ${
          type === EQueryContentType.POST
            ? 'bg-primary-500 !text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Posts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryContentType.MEETUP)}
        className={`${linkStyles} ${
          type === EQueryContentType.MEETUP
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Meetups
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryContentType.PODCAST)}
        className={`${linkStyles} ${
          type === EQueryContentType.PODCAST
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Podcasts
      </Link>
      {isGroupPage ? (
        <Link
          href={pathname + '?' + updateQueryParams(EQueryContentType.MEMBERS)}
          className={`${linkStyles} ${
            type === EQueryContentType.MEMBERS
              ? 'bg-primary-500 text-white-100 dark:!text-white-100'
              : ''
          }`}
        >
          Members
        </Link>
      ) : (
        <Link
          href={pathname + '?' + updateQueryParams(EQueryContentType.GROUP)}
          className={`${linkStyles} ${
            type === EQueryContentType.GROUP
              ? 'bg-primary-500 text-white-100 dark:!text-white-100'
              : ''
          }`}
        >
          Groups
        </Link>
      )}
    </div>
  );
};

export default ContentNavLinks;
