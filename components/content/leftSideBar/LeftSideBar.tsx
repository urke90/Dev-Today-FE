import ContentStats from './ContentStats';
import SharePost from './SharePost';

type Props = {};

const LeftSideBar = (props: Props) => {
  return (
    <aside className="left-sidebar !p-0 ">
      <ContentStats />
      <SharePost />
      <p className="bg-light100__dark800  p-5  rounded-2xl p2-medium !text-white-400 ">
        <span className="text-blue-500">AR. Jakir </span>Posted on February
        21,2022
      </p>
    </aside>
  );
};
export default LeftSideBar;
