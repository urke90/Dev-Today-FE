import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------

const LeftSidebarLoader = () => {
  return (
    <aside className="left-sidebar">
      <Skeleton className="left-sidebar-item h-52" />
      <Skeleton className="left-sidebar-item h-64" />
      <Skeleton className="left-sidebar-item h-64" />
    </aside>
  );
};

export default LeftSidebarLoader;
