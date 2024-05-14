import Image from 'next/image';
import BadgeItem from './BadgeItem';
import HeartIcon from '../icons/Heart';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface IPodcastItemCardProps {
  item?: any;
}

/**
 * TODO: Check with Mateo how should this card be rendered.
 */

const PodcastItemCard: React.FC<IPodcastItemCardProps> = ({ item }) => {
  return (
    <li className="flex flex-col gap-3.5 lg:gap-[18px] py-5 px-3.5 lg:p-4 bg-light100__dark800 rounded-[10px] lg:rounded-2xl">
      <div className="flex gap-2 lg:flex-between">
        <Image
          src="/assets/images/podcast-example.svg"
          width={50}
          height={50}
          alt="podcast"
        />
        <p className="p3-bold lg:p1-bold line-clamp-2">
          Mastering Modern Web Development: A Deep Dive into Next.js
        </p>
        <Button
          variant="icon"
          className="dark:bg-black-700 bg-white-200 size-[30px] shrink-0 rounded-full"
        >
          {/* TODO: HOW TO MAKE THIS ICON RESIZE ON DIFFERENT VIEWPORTS */}
          <HeartIcon className="text-white-300" />
        </Button>
      </div>
      <p className="p4-regular lg:p3-regular line-clamp-3 lg:line-clamp-4">
        Embark on a coding odyssey with Alex CodeSmith! Join us as we delve into
        the intricacies of modern web development, unraveling the mysteries of
        React, Next.js, TypeScript, Node.js, MongoDB, & much more.
      </p>
      <ul className="flex gap-2.5">
        <BadgeItem title="Finance" />
        <BadgeItem title="Bitcoin" />
        <BadgeItem title="Crypto" />
      </ul>
      <div className="flex items-center gap-[7px] lg:gap-2.5">
        <div className="relative size-[30px] lg:size-[40px]">
          <Image
            fill
            src="/assets/images/no-image.svg"
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="p4-bold lg:p3-bold">JS Mastery</span>
          <span className="subtitle-normal">3 weeks ago</span>
        </div>
      </div>
    </li>
  );
};

export default PodcastItemCard;
