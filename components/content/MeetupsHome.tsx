// ----------------------------------------------------------------

import type {
  IContentPagesResponse,
  IContentPagesSidebarResponse,
} from '@/types/content';
import { EQueryType, ESortByFilter } from '@/types/queries';
import SidebarGroupItem from '../shared/LeftSidebarItems/SidebarGroupItem';
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

interface IMeetupsHomeProps {
  selectedTag: string;
  meetupsData: IContentPagesResponse;
  viewerId: string;
  sortBy: ESortByFilter;
  sidebarData: IContentPagesSidebarResponse;
}

const MeetupsHome: React.FC<IMeetupsHomeProps> = ({
  selectedTag,
  viewerId,
  meetupsData,
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
          contentType={EQueryType.MEETUP}
          viewerId={viewerId}
          contentData={meetupsData}
          sortBy={sortBy}
        />
      </main>
      <aside className="right-sidebar">
        <SidebarContentCard title="Posts" items={sidebarData.posts} />
        <SidebarContentCard title="Podcasts" items={sidebarData.podcasts} />
      </aside>
    </div>
  );
};

export default MeetupsHome;
