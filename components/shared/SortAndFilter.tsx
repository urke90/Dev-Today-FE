import FollowIcon from '../icons/sort-and-filter/Follow';
import NewIcon from '../icons/sort-and-filter/New';
import PopularIcon from '../icons/sort-and-filter/Popular';

// ----------------------------------------------------------------

interface ISortAndFilterProps {
  isGroupPage?: boolean;
  followingCount?: number;
}

const SortAndFilter: React.FC<ISortAndFilterProps> = ({
  isGroupPage = false,
  followingCount,
}) => {
  return (
    <div className="left-sidebar-item max-md:items-center">
      <p className="p2-bold max-md:hidden">Sort & Filters</p>
      <ul className="flex md:flex-col gap-2.5">
        <li className="flex items-center gap-2.5 rounded-md py-1 px-[5px] md:py-1.5 hover:dark:bg-black-700 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
          <NewIcon className="text-white-200 dark:text-black-700" />
          <p className="p4-medium">
            Newest <span className="max-md:hidden">and Recent</span>
          </p>
        </li>
        <li className="flex items-center gap-2.5 rounded-md py-1 px-[5px] md:py-1.5 hover:dark:bg-black-700 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
          <PopularIcon className="text-white-200 dark:text-black-700" />
          <p className="p4-medium">Popular</p>
        </li>
        <SortAndFilterItem
          isGroupPage={isGroupPage}
          followingCount={followingCount}
        />
      </ul>
    </div>
  );
};

interface ISortAndFilterItemProps {
  isGroupPage: boolean;
  followingCount?: number;
}

const SortAndFilterItem: React.FC<ISortAndFilterItemProps> = ({
  isGroupPage,
  followingCount,
}) => {
  if (isGroupPage) {
    return (
      <li className="flex items-center gap-2.5 rounded-md py-1 px-[5px] md:py-1.5 hover:dark:bg-black-700 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
        <FollowIcon className="text-white-200 dark:text-black-700" />
        <p className="p4-medium">Joined groups</p>
      </li>
    );
  }

  return (
    <li className="flex-between rounded-md py-1 px-[5px] md:py-1.5 hover:dark:bg-black-700 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
      <div className="flex items-center gap-2.5">
        <FollowIcon className="text-white-200 dark:text-black-700" />
        <p className="p4-medium">
          {isGroupPage ? 'Joined groups' : 'Following'}
        </p>
      </div>
      {followingCount && (
        <div className="bg-primary-500 rounded py-[3px] px-1.5 text-white-100 font-semibold text-[9px] flex-center max-md:hidden">
          {followingCount}
        </div>
      )}
    </li>
  );
};

export default SortAndFilter;
