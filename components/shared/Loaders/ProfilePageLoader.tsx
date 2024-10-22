import RightSidebarLoader from './RightSidebarLoader';

import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------

const ProfilePageLoader = () => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <Skeleton className="left-sidebar-item h-[560px]" />
      </aside>
      <main className="main-content">
        <div className="flex w-full flex-col gap-5">
          <Skeleton className="bg-light100__dark800 shadow-card h-[64px]" />
          <ul className="flex flex-col flex-wrap gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="bg-light100__dark800 shadow-card flex h-52 cursor-pointer gap-4 rounded-2xl p-4 md:items-center md:p-5"
              />
            ))}
          </ul>
        </div>
      </main>
      <RightSidebarLoader numItems={1} />
    </div>
  );
};

export default ProfilePageLoader;
