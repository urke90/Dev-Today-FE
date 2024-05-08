import Image from 'next/image';
import BadgeItem from './BadgeItem';

// ----------------------------------------------------------------

interface IMeetupItemCardProps {
  imgUrl: string;
  title: string;
  location: string;
  date: Date | string;
  description: string;
  tags: string[];
}

const MeetupItemCard: React.FC<IMeetupItemCardProps> = ({
  imgUrl,
  location,
  title,
  date,
  description,
  tags,
}) => {
  return (
    <li className="flex flex-col gap-2.5 px-3.5 py-5 bg-light100__dark800 rounded-[10px]">
      <div className="flex flex-between ">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative size-[56px] md:size-[72px] shrink-0">
            <Image
              src={imgUrl}
              sizes="(max-width: 768px) 56px"
              alt="meetup"
              fill
            />
          </div>
          <div>
            <p className="lg:p1-bold p3-bold">{title}</p>
            <p className="lg:p3-regular subtitle-normal">{location}</p>
          </div>
        </div>
        <div className="flex-center flex-col rounded-[6px] w-[38px] h-[56px] md:h-[58px] md:w-[54px] py-[5px] px-2.5 bg-light200__dark700 shrink-0">
          <span className="subtitle-normal md:p4-regular uppercase text-black-800 dark:text-white-200">
            FEB
          </span>
          <span className="!text-primary-500 p2-bold md:d2-bold">2</span>
        </div>
      </div>
      <div>
        <p className="p4-regular line-clamp-2 md:p3-regular">{description}</p>
      </div>
      <ul className="flex gap-2.5">
        {tags.map((tag) => (
          <BadgeItem key={tag} title={tag} />
        ))}
      </ul>
    </li>
  );
};

export default MeetupItemCard;
