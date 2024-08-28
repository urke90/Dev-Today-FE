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
  const type = searchParams.get('type') ?? EQueryType.POST;

  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);

    return params.toString();
  };

  return (
    <div className="bg-light100__dark800 flex-between mx-auto w-full rounded-lg p-3.5 shadow-card">
      <Link
        href={pathname + '?' + updateQueryParams(EQueryType.POST)}
        className={`nav-link-tab ${
          type === EQueryType.POST ? 'nav-link-tab--active' : ''
        }`}
      >
        Posts
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryType.MEETUP)}
        className={`nav-link-tab ${
          type === EQueryType.MEETUP ? 'nav-link-tab--active' : ''
        }`}
      >
        Meetups
      </Link>
      <Link
        href={pathname + '?' + updateQueryParams(EQueryType.PODCAST)}
        className={`nav-link-tab ${
          type === EQueryType.PODCAST ? 'nav-link-tab--active' : ''
        }`}
      >
        Podcasts
      </Link>
      {isGroupPage ? (
        <Link
          href={pathname + '?' + updateQueryParams(EQueryType.MEMBERS)}
          className={`nav-link-tab ${
            type === EQueryType.MEMBERS ? 'nav-link-tab--active' : ''
          }`}
        >
          Members
        </Link>
      ) : (
        <Link
          href={pathname + '?' + updateQueryParams(EQueryType.GROUP)}
          className={`nav-link-tab ${
            type === EQueryType.GROUP ? 'nav-link-tab--active' : ''
          }`}
        >
          Groups
        </Link>
      )}
    </div>
  );
};

export default ContentNavLinks;
