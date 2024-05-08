import Image from 'next/image';
import { Button } from '../ui/button';
import ShareIcon from '../icons/Share';

// ----------------------------------------------------------------

interface IGroupItemCardProps {
  imgUrl: string;
  title: string;
  description: string;
}

const GroupItemCard: React.FC<IGroupItemCardProps> = ({
  imgUrl,
  title,
  description,
}) => {
  return (
    <li className="flex flex-col bg-light100__dark800 p-5 rounded-2xl gap-3.5 flex-0 shrink-0">
      <div className="relative w-full h-[150px]">
        <Image
          fill
          alt="group"
          src={imgUrl}
          className="rounded-xl object-cover"
        />
      </div>
      <p className="p1-bold">{title}</p>
      <p className="p3-regular line-clamp-3">{description}</p>
      <div className="flex-between">
        <div className="flex ml-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="size-[30px] bg-[#F0F1FE] rounded-full flex-center -ml-3"
            >
              <Image
                width={22}
                height={22}
                src={`/assets/images/avatars/avatar-${index + 1}.svg`}
                alt="avatar"
              />
            </div>
          ))}
          <div className="size-[30px] bg-[#F0F1FE] dark:bg-black-700 cap-8 text-black-700 dark:text-white-100 rounded-full flex-center -ml-3">
            120+
          </div>
        </div>
        <Button
          variant="icon"
          className="size-[30px] bg-white-200 dark:bg-black-700 rounded-full"
        >
          <ShareIcon className="text-white-300" />
        </Button>
      </div>
    </li>
  );
};

export default GroupItemCard;
