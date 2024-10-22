import LeftSidebarLoader from './LeftSidebarLoader';
import RightSidebarLoader from './RightSidebarLoader';

import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------

const MeetupsPageLoader = () => {
  return (
    <div className="content-wrapper">
      <LeftSidebarLoader />
      <main className="main-content">
        <ul className="flex flex-col flex-wrap gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="bg-light100__dark800 shadow-card flex h-52 cursor-pointer gap-4 rounded-2xl p-4 md:items-center md:p-5"
            />
          ))}
        </ul>
      </main>
      <RightSidebarLoader />
    </div>
  );
};

export default MeetupsPageLoader;
