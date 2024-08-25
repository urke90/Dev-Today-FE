// ----------------------------------------------------------------

import ContentList from './ContentList';

import SidebarGroupItem from '../shared/LeftSidebarItems/SidebarGroupItem';
import SidebarItemWrapper from '../shared/LeftSidebarItems/SidebarItemWrapper';
import SidebarTagItem from '../shared/LeftSidebarItems/SidebarTagItem';
import SidebarContentCard from '../shared/RightSidebarItems/SidebarContentCard';
import SortAndFilter from '../shared/SortAndFilter';

import { EQueryType, ESortByFilter } from '@/types/queries';
import {
  IContentPagesResponse,
  IContentPagesSidebarResponse,
} from '@/types/content';

interface IPostsHomeProps {
  selectedTag: string;
  podcastsData: IContentPagesResponse;
  viewerId: string;
  sortBy: ESortByFilter;
  sidebarData: IContentPagesSidebarResponse;
}

const PodcastsHome: React.FC<IPostsHomeProps> = ({
  selectedTag,
  viewerId,
  podcastsData,
  sortBy,
  sidebarData,
}) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <SortAndFilter
          sortBy={sortBy}
          followingCount={sidebarData.followingUsersCount}
        />
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
        <SidebarItemWrapper
          title="Top Ranked"
          items={sidebarData.popularGroupsSorted?.map(
            ({ id, profileImage, name, count }) => (
              <SidebarGroupItem
                key={id}
                id={id}
                profileImage={profileImage}
                name={name}
                totalItems={count}
              />
            )
          )}
        />
      </aside>
      <main className="main-content">
        <ContentList
          selectedTag={selectedTag}
          contentType={EQueryType.PODCAST}
          viewerId={viewerId}
          contentData={podcastsData}
          sortBy={sortBy}
        />
      </main>
      <aside className="right-sidebar">
        <SidebarContentCard title="Meetups" items={sidebarData.meetups} />
        <SidebarContentCard title="Posts" items={sidebarData.posts} />
      </aside>
    </div>
  );
};

export default PodcastsHome;
