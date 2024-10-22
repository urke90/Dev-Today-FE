import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------

const MeetupsPageLoader = () => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <Skeleton className="left-sidebar-item h-52" />
        <Skeleton className="left-sidebar-item h-64" />
        <Skeleton className="left-sidebar-item h-64" />
      </aside>
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
      <aside className="right-sidebar">
        <Skeleton className="right-sidebar-item h-80" />
        <Skeleton className="right-sidebar-item h-80" />
      </aside>
    </div>
  );
};

export default MeetupsPageLoader;
