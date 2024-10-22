import RightSidebarLoader from './RightSidebarLoader';

import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------

const SingleContentPageLoader = () => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <Skeleton className="left-sidebar-item h-[154px]" />
        <Skeleton className="left-sidebar-item h-[36px]" />
        <Skeleton className="left-sidebar-item h-[88px]" />
      </aside>
      <main className="main-content">
        <Skeleton className="bg-light100__dark800 shadow-card mb-5 h-[276px] rounded-[10px]" />
        <Skeleton className="bg-light100__dark800 shadow-card mb-5 h-[276px] rounded-[10px]" />
        <Skeleton className="bg-light100__dark800 shadow-card mb-5 mt-14 h-[276px] rounded-[10px]" />
      </main>
      <RightSidebarLoader numItems={2} />
    </div>
  );
};

export default SingleContentPageLoader;
