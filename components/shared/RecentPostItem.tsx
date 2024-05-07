import Image from 'next/image';
import ArrowRightIcon from '../icons/ArrowRight';

// ----------------------------------------------------------------

interface IRecentPostItemProps {}

const RecentPostItem: React.FC<IRecentPostItemProps> = (props) => {
  return (
    <li className="flex">
      <div className="flex gap-3.5">
        <Image
          src="/assets/images/post-example.svg"
          alt="post"
          width={58}
          height={58}
          className="rounded"
        />
        <div className="flex flex-col gap-[6px]">
          <p className="p4-medium">
            The Code Breaker's Toolkit: Unraveling Challenges
          </p>
          <p className="subtitle-normal">by Liam Debugger </p>
        </div>
      </div>
      <ArrowRightIcon className="text-white-400 shrink-0" />
    </li>
  );
};

export default RecentPostItem;
