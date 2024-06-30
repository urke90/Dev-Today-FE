// ----------------------------------------------------------------

interface ISidebarItemWrapperProps {
  title: string;
  items: JSX.Element[];
}

const SidebarItemWrapper: React.FC<ISidebarItemWrapperProps> = ({
  title,
  items,
}) => {
  return (
    <div className="left-sidebar-item gap-3">
      <p className="p2-bold">{title}</p>
      <ul className="flex flex-col gap-3.5">{items}</ul>
    </div>
  );
};

export default SidebarItemWrapper;
