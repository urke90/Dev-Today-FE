// ----------------------------------------------------------------

import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';

interface IGroupDetailsProps {}

const GroupDetails: React.FC<IGroupDetailsProps> = (props) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <div className="left-sidebar-item gap-3">
          <p className="p2-bold">About Group</p>
          <p className="p4-regular">
            Master Modern Web Dev With a Project Based Approach. Gain real-world
            experience and land that dream dev job sooner. Dive into a
            collaborative learning environment where practical application meets
            cutting-edge technologies, propelling you towards success
          </p>
        </div>
        <div className="left-sidebar-item gap-3">
          <p className="p2-bold">Statistical Highlights</p>
          <ul className="flex md:flex-col  gap-2.5">
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">300</span> Posts
              </p>
            </li>
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">2831</span>{' '}
                Members
              </p>
            </li>
            <li>
              <p className="p3-bold">
                <span className="p3-medium !text-primary-500">43</span> Admins
              </p>
            </li>
          </ul>
        </div>
        <div className="max-md:hidden">
          <SidebarItemWrapper title="Top Ranked" items={[]} />
        </div>
      </aside>
      <main className="main-content border">MAIN CONTENT</main>
      <aside className="right-sidebar border">RIGHT SIDEBAR</aside>
    </div>
  );
};

export default GroupDetails;
