// ----------------------------------------------------------------

import {
  IContentPagesResponse,
  IContentPagesSidebarResponse,
} from '@/types/content';
import { EQueryType, ESortByFilter } from '@/types/queries';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import SidebarTagItem from '../shared/LeftSidebarItems/SidebarTagItem';
import SidebarContentCard from '../shared/RightSidebarItems/SidebarContentCard';
import SortAndFilter from '../shared/SortAndFilter';
import ContentList from './ContentList';

interface IPostsHomeProps {
  selectedTag: string;
  postsData: IContentPagesResponse;
  viewerId: string;
  sortBy: ESortByFilter;
  sidebarData: IContentPagesSidebarResponse;
}

const PostsHome: React.FC<IPostsHomeProps> = ({
  selectedTag,
  viewerId,
  postsData,
  sortBy,
  sidebarData,
}) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <SortAndFilter sortBy={sortBy} />
        <SidebarItemWrapper
          title="Popular Tags"
          items={sidebarData.popularTagsSorted.map(
            ({ id, count, title }, index) => (
              <SidebarTagItem
                key={id}
                index={index + 1}
                postCount={count}
                title={title}
                selectedTag={selectedTag}
              />
            )
          )}
        />
      </aside>
      <main className="main-content">
        <ContentList
          contentType={EQueryType.POST}
          viewerId={viewerId}
          contentData={postsData}
          sortBy={sortBy}
        />
      </main>
      <aside className="right-sidebar">
        <SidebarContentCard title="Meetups" items={sidebarData.meetups} />
        <SidebarContentCard title="Podcasts" items={sidebarData.podcasts} />
      </aside>
    </div>
  );
};

export default PostsHome;
