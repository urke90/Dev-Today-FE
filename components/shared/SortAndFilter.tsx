'use client';

import { ESortByFilter } from '@/types/queries';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import FollowIcon from '../icons/sort-and-filter/Follow';
import NewIcon from '../icons/sort-and-filter/New';
import PopularIcon from '../icons/sort-and-filter/Popular';

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
      <div className="flex md:flex-col gap-2.5">
        <Link
          href={pathname + '?' + handleUpdateFilter(ESortByFilter.RECENT)}
          className={`flex items-center gap-2.5 rounded-md py-1 px-[5px] md:py-1.5 hover-sidebar-items cursor-pointer ${sortBy === ESortByFilter.RECENT ? activeClassName : ''}`}
        >
          <NewIcon className="text-white-200 dark:text-black-700" />
          <p className="p4-medium">
            Newest <span className="max-md:hidden">and Recent</span>
          </p>
        </Link>
        <Link
          href={pathname + '?' + handleUpdateFilter(ESortByFilter.POPULAR)}
          className={`flex items-center gap-2.5 rounded-md py-1 px-[5px] md:py-1.5 hover-sidebar-items cursor-pointer ${sortBy === ESortByFilter.POPULAR ? activeClassName : ''}`}
        >
          <PopularIcon className="text-white-200 dark:text-black-700" />
          <p className="p4-medium">Popular</p>
        </Link>
        {isGroupPage ? (
          <Link
            href={pathname + '?' + handleUpdateFilter(ESortByFilter.JOINED)}
            className={`flex items-center gap-2.5 rounded-md py-1 px-[5px] md:py-1.5 hover-sidebar-items cursor-pointer ${sortBy === ESortByFilter.JOINED ? activeClassName : ''}`}
          >
            <FollowIcon className="text-white-200 dark:text-black-700" />
            <p className="p4-medium">Joined groups</p>
          </Link>
        ) : (
          <Link
            href={pathname + '?' + handleUpdateFilter(ESortByFilter.FOLLOWING)}
            className={`flex-between rounded-md py-1 px-[5px] md:py-1.5 hover:dark:bg-black-700 hover:bg-[#F8FAFC] transition-colors cursor-pointer ${sortBy === ESortByFilter.FOLLOWING ? activeClassName : ''}`}
          >
            <div className="flex items-center gap-2.5">
              <FollowIcon className="text-white-200 dark:text-black-700" />
              <p className="p4-medium">Following</p>
            </div>
            <div className="bg-primary-500 rounded py-[3px] px-1.5 text-white-100 font-semibold text-[9px] flex-center max-md:hidden">
              {followingCount}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SortAndFilter;
