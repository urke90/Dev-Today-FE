import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------

interface IRightSidebarLoaderProps {
  numItems?: number;
}

const RightSidebarLoader: React.FC<IRightSidebarLoaderProps> = ({
  numItems = 3,
}) => {
  return (
    <aside className="right-sidebar">
      {Array.from({ length: numItems }).map((_, i) => (
        <Skeleton key={i} className="right-sidebar-item h-80" />
      ))}

      {/* <Skeleton className="right-sidebar-item h-80" /> */}
    </aside>
  );
};

export default RightSidebarLoader;
