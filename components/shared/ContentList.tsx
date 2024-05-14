import { EQueryContentType } from '@/types/content';
import PostItemCard from './PostItemCard';
import MeetupItemCard from './MeetupItemCard';
import PodcastItemCard from './PodcastItemCard';
import GroupItemCard from './GroupItemCard';

// ----------------------------------------------------------------

interface IContentListProps {
  contentType: EQueryContentType;
  items: any;
}

const ContentList: React.FC<IContentListProps> = ({ contentType, items }) => {
  switch (contentType) {
    case EQueryContentType.POSTS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          <PostItemCard imgUrl="/assets/images/post-example.svg" />
        </ul>
      );
    }
    case EQueryContentType.MEETUPS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          <MeetupItemCard
            imgUrl="/assets/images/meetup-example.svg"
            title="A Deep Dive into the Latest UI/UX Trends and Techniques"
            location="Innovation Hub, Austin"
            description="Elevate your web development skills by delving into the latest UI/UX
                  trends and techniques. Join us for an insightful session filled with
                  hands-on demonstrations, expert-led discussions, and networking
                  opportunities."
            date="FEB 3"
            tags={['Developer', 'Tech Guru', 'Software']}
          />
        </ul>
      );
    }
    case EQueryContentType.PODCASTS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          <PodcastItemCard />
        </ul>
      );
    }
    case EQueryContentType.GROUPS: {
      return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GroupItemCard
            title="CodeCrafters Hub"
            imgUrl="/assets/images/group-example.svg"
            description="Connect with fellow developers, share insights, and embark on coding
            adventures. Join us in mastering the art of web dev through
            collaborative projects."
          />
          <GroupItemCard
            title="CodeCrafters Hub"
            imgUrl="/assets/images/group-example.svg"
            description="Connect with fellow developers, share insights, and embark on coding
            adventures. Join us in mastering the art of web dev through
            collaborative projects."
          />
        </ul>
      );
    }
    default: {
      return <ul className="flex flex-col flax-wrap gap-5"></ul>;
    }
  }
};

export default ContentList;
