// ----------------------------------------------------------------

import { IContentPagesResponse } from '@/types/content';
import { EQueryType, ESortByFilter } from '@/types/queries';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import SidebarTagItem from '../shared/LeftSidebarItems/SidebarTagItem';
import SidebarContentCard from '../shared/RightSidebarItems/SidebarContentCard';
import SortAndFilter from '../shared/SortAndFilter';
import ContentList from './ContentList';

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
  podcastsData: IContentPagesResponse;
  viewerId: string;
  sortBy: ESortByFilter;
}

const PodcastsHome: React.FC<IPostsHomeProps> = ({
  selectedTag,
  viewerId,
  podcastsData,
  sortBy,
}) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <SortAndFilter sortBy={sortBy} />
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
      <main className="main-content">
        <ContentList
          contentType={EQueryType.PODCAST}
          viewerId={viewerId}
          contentData={podcastsData}
          sortBy={sortBy}
        />
      </main>
      <aside className="right-sidebar">
        <SidebarContentCard title="Meetups" items={[]} />
        <SidebarContentCard title="Posts" items={[]} />
      </aside>
    </div>
  );
};

export default PodcastsHome;
