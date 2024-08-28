'use client';

import FollowIcon from '../icons/sort-and-filter/Follow';
import NewIcon from '../icons/sort-and-filter/New';
import PopularIcon from '../icons/sort-and-filter/Popular';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { ESortByFilter } from '@/types/queries';

// ----------------------------------------------------------------

interface ISortAndFilterProps {
  isGroupPage?: boolean;
  followingCount?: number;
  sortBy: ESortByFilter;
}

const activeClassName = 'dark:bg-black-700 bg-[#F8FAFC]';

const SortAndFilter: React.FC<ISortAndFilterProps> = ({
  isGroupPage = false,
  followingCount,
  sortBy,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateFilter = (value: ESortByFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    const existingParam = params.get('sortBy');

    if (existingParam === value) {
      params.delete('sortBy');
    } else {
      params.set('sortBy', value);
    }

    return params.toString();
  };

  return (
    <div className="left-sidebar-item max-md:items-center">
      <p className="p2-bold max-md:hidden">Sort & Filters</p>
      <div className="flex gap-2.5 md:flex-col">
        <Link
          href={pathname + '?' + handleUpdateFilter(ESortByFilter.RECENT)}
          className={`hover-sidebar-items flex cursor-pointer items-center gap-2.5 rounded-md px-[5px] py-1 md:py-1.5 ${sortBy === ESortByFilter.RECENT ? activeClassName : ''}`}
        >
          <NewIcon className="text-white-200 dark:text-black-700" />
          <p className="p4-medium">
            Newest <span className="max-md:hidden">and Recent</span>
          </p>
        </Link>
        <Link
          href={pathname + '?' + handleUpdateFilter(ESortByFilter.POPULAR)}
          className={`hover-sidebar-items flex cursor-pointer items-center gap-2.5 rounded-md px-[5px] py-1 md:py-1.5 ${sortBy === ESortByFilter.POPULAR ? activeClassName : ''}`}
        >
          <PopularIcon className="text-white-200 dark:text-black-700" />
          <p className="p4-medium">Popular</p>
        </Link>
        {isGroupPage ? (
          <Link
            href={pathname + '?' + handleUpdateFilter(ESortByFilter.JOINED)}
            className={`hover-sidebar-items flex cursor-pointer items-center gap-2.5 rounded-md px-[5px] py-1 md:py-1.5 ${sortBy === ESortByFilter.JOINED ? activeClassName : ''}`}
          >
            <FollowIcon className="text-white-200 dark:text-black-700" />
            <p className="p4-medium">Joined groups</p>
          </Link>
        ) : (
          <Link
            href={pathname + '?' + handleUpdateFilter(ESortByFilter.FOLLOWING)}
            className={`flex-between cursor-pointer rounded-md px-[5px] py-1 transition-colors hover:bg-[#F8FAFC] hover:dark:bg-black-700 md:py-1.5 ${sortBy === ESortByFilter.FOLLOWING ? activeClassName : ''}`}
          >
            <div className="flex items-center gap-2.5">
              <FollowIcon className="text-white-200 dark:text-black-700" />
              <p className="p4-medium">Following</p>
            </div>
            <div className="flex-center rounded bg-primary-500 px-1.5 py-[3px] text-[9px] font-semibold text-white-100 max-md:hidden">
              {followingCount}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SortAndFilter;
