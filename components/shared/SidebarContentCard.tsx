import ArrowRightIcon from '../icons/ArrowRight';

import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

interface ISidebarContentCardProps {
  title: string;
  items: any[];
}

/**
 * This card will be used for rendering PODCAST or POST items in the right sidebar.
 * For Meetups, use MeetupItemCard instead.
 */
const SidebarContentCard: React.FC<ISidebarContentCardProps> = ({ title }) => {
  return (
    <div className="right-sidebar-item">
      <div className="flex items-center gap-[3px]">
        <p className="p2-bold">{title}</p>
        <ArrowRightIcon className="text-black-800 dark:text-white-200" />
      </div>
      <ul className="flex flex-col gap-5">
        <SidebarContentCardItem
          imgUrl="/assets/images/post-example.svg"
          title="The Code Breaker's Toolkit: Unraveling Challenges"
          author="by Liam Debugger"
          link="#"
        />
        <SidebarContentCardItem
          imgUrl="/assets/images/post-example.svg"
          title="The Code Breaker's Toolkit: Unraveling Challenges"
          author="by Liam Debugger"
          link="#"
        />
        <SidebarContentCardItem
          imgUrl="/assets/images/post-example.svg"
          title="The Code Breaker's Toolkit: Unraveling Challenges"
          author="by Liam Debugger"
          link="#"
        />
      </ul>
    </div>
  );
};

interface ISidebarContentCardItemProps {
  imgUrl: string;
  title: string;
  author: string;
  link: string;
}

const SidebarContentCardItem: React.FC<ISidebarContentCardItemProps> = ({
  imgUrl,
  title,
  author,
  link,
}) => {
  return (
    <li>
      <Link href={link} className="flex">
        <div className="flex gap-3.5">
          <Image
            src={imgUrl}
            alt="post"
            width={58}
            height={58}
            className="rounded"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="p4-medium">{title}</p>
            <p className="subtitle-normal">{author}</p>
          </div>
        </div>
        <ArrowRightIcon className="text-white-400 shrink-0" />
      </Link>
    </li>
  );
};

export default SidebarContentCard;
