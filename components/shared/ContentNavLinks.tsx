'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { EQueryType } from '@/types/queries';

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
  const type = searchParams.get('type') ?? EQueryType.POST;

  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);

    return params.toString();
  };

  const linkStyles =
    'p1-medium text-white-400 dark:text-white-300 py-2 px-3.5 rounded-[7px] w-auto break-keep	';

  return (
    <div className="bg-light100__dark800 flex-between mx-auto w-full rounded-lg p-3.5 shadow-card">
      <Link
        href={pathname + '?' + updateQueryParams(EQueryType.POST)}
        className={`${linkStyles} ${
          type === EQueryType.POST
            ? 'bg-primary-500 !text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Posts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryType.MEETUP)}
        className={`${linkStyles} ${
          type === EQueryType.MEETUP
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Meetups
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryType.PODCAST)}
        className={`${linkStyles} ${
          type === EQueryType.PODCAST
            ? 'bg-primary-500 text-white-100 dark:!text-white-100'
            : ''
        }`}
      >
        Podcasts
      </Link>
      {isGroupPage ? (
        <Link
          href={pathname + '?' + updateQueryParams(EQueryType.MEMBERS)}
          className={`${linkStyles} ${
            type === EQueryType.MEMBERS
              ? 'bg-primary-500 text-white-100 dark:!text-white-100'
              : ''
          }`}
        >
          Members
        </Link>
      ) : (
        <Link
          href={pathname + '?' + updateQueryParams(EQueryType.GROUP)}
          className={`${linkStyles} ${
            type === EQueryType.GROUP
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
