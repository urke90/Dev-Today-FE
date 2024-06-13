import ArrowRightIcon from '../../icons/ArrowRight';

import { EContentType, type IContent } from '@/types/content';
import SidebarMeetupItem from './SidebarMeetupItem';
import SidebarPodcastItem from './SidebarPodcastItem';
import SidebarPostItem from './SidebarPostItem';

// ----------------------------------------------------------------

interface ISidebarContentCardProps<> {
  title: string;
  items: IContent[];
}

/**
 * This card will be used for rendering PODCAST or POST items in the right sidebar.
 * For Meetups, use MeetupItemCard instead.
 */
const SidebarContentCard: React.FC<ISidebarContentCardProps> = ({
  title,
  items,
}) => {
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
                description,
                coverImage,
                meetupDate,
                tags,
                title,
                type,
              }) => {
                switch (type) {
                  case EContentType.POST: {
                    return (
                      <SidebarPostItem
                        key={id}
                        id={id}
                        coverImage={coverImage}
                        title={title}
                        author={author.name}
                        type={type}
                      />
                    );
                  }
                  case EContentType.MEETUP: {
                    return (
                      <SidebarMeetupItem
                        key={id}
                        id={id}
                        location="LOCATION IS HARDCODED FOR NOW"
                        title={title}
                        tags={tags}
                        type={type}
                        meetupDate={meetupDate}
                      />
                    );
                  }
                  case EContentType.PODCAST: {
                    return (
                      <SidebarPodcastItem
                        key={id}
                        id={id}
                        author={author}
                        description={description}
                        title={title}
                        type={type}
                      />
                    );
                  }
                  default:
                    return <p className="p3-bold">Type is not supported!</p>;
                }
              }
            )
          : null}
      </ul>
    </div>
  );
};

export default SidebarContentCard;
