import LeftSidebarLoader from './LeftSidebarLoader';
import RightSidebarLoader from './RightSidebarLoader';

import { Skeleton } from '@/components/ui/skeleton';

const PodcastsPageLoader = () => {
  return (
    <div className="content-wrapper">
      <LeftSidebarLoader />
      <main className="main-content">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="bg-light100__dark800 shadow-card flex h-64 cursor-pointer gap-4 rounded-2xl p-4 md:items-center md:p-5"
            />
          ))}
        </ul>
      </main>
      <RightSidebarLoader />
    </div>
  );
};

export default PodcastsPageLoader;
