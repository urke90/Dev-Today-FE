import SidebarMeetupItem from './SidebarMeetupItem';
import SidebarPodcastItem from './SidebarPodcastItem';
import SidebarPostItem from './SidebarPostItem';

import ArrowRightIcon from '../../icons/ArrowRight';

import { EContentType, type IContent } from '@/types/content';

// ----------------------------------------------------------------

interface ISidebarContentCardProps<> {
  title: string;
  items: IContent[];
}

const SidebarContentCard: React.FC<ISidebarContentCardProps> = ({
  title,
  items,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="right-sidebar-item">
      <div className="flex items-center gap-[3px]">
        <p className="p2-bold">{title}</p>
        <ArrowRightIcon className="text-black-800 dark:text-white-200" />
      </div>
      <ul className="flex flex-col gap-5">
        {items?.length > 0
          ? items.map(
              ({
                id,
                author,
                coverImage,
                meetupDate,
                tags,
                title,
                type,
                meetupLocation,
              }) => {
                switch (type) {
                  case EContentType.POST: {
                    return (
                      <SidebarPostItem
                        key={id}
                        id={id}
                        coverImage={coverImage}
                        title={title}
                        author={author.userName}
                      />
                    );
                  }
                  case EContentType.MEETUP: {
                    return (
                      <SidebarMeetupItem
                        key={id}
                        id={id}
                        address={meetupLocation?.address}
                        title={title}
                        tags={tags}
                        meetupDate={meetupDate}
                      />
                    );
                  }
                  case EContentType.PODCAST: {
                    return (
                      <SidebarPodcastItem
                        key={id}
                        id={id}
                        author={author.userName}
                        coverImage={coverImage}
                        title={title}
                      />
                    );
                  }
                  default:
                    return <p className="p3-bold">Invalid data!</p>;
                }
              }
            )
          : null}
      </ul>
    </div>
  );
};

export default SidebarContentCard;
