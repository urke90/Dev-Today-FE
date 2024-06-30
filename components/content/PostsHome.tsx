// ----------------------------------------------------------------

import { ESortByFilter } from '@/types/queries';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import SidebarTagItem from '../shared/LeftSidebarItems/SidebarTagItem';
import SortAndFilter from '../shared/SortAndFilter';

const TAG_ITEMS = [
  {
    id: '1',
    title: 'javascript',
    postCount: 825,
  },
  {
    id: '2',
    title: 'nesto',
    postCount: 825,
  },
  {
    id: '3',
    title: 'broj3',
    postCount: 825,
  },
  {
    id: '4',
    title: '4',
    postCount: 825,
  },
  {
    id: '5',
    title: '5',
    postCount: 825,
  },
];

interface IPostsHomeProps {
  selectedTag: string;
}

const PostsHome: React.FC<IPostsHomeProps> = ({ selectedTag }) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <SortAndFilter sortBy={ESortByFilter.FOLLOWING} />
        <SidebarItemWrapper
          title="Popular Tags"
          items={TAG_ITEMS.map(({ id, postCount, title }, index) => (
            <SidebarTagItem
              key={id}
              index={index + 1}
              postCount={postCount}
              title={title}
              selectedTag={selectedTag}
            />
          ))}
        />
      </aside>
      <main className="main-content">MAIN</main>
      <aside className="right-sidebar">LEFT SIDEBAR</aside>
    </div>
  );
};

export default PostsHome;
