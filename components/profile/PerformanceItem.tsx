import Image from 'next/image';

// ----------------------------------------------------------------

interface IPerformanceItemProps {}

const PerformanceItem: React.FC<IPerformanceItemProps> = (props) => {
  return (
    <li className="flex gap-3.5 items-center">
      <Image
        src="/assets/images/post-example.svg"
        width={50}
        height={50}
        alt="item"
        className="rounded"
      />
      <div className="flex gap-7">
        <div className="flex flex-col">
          <span className="p3-regular text-white-400 dark:text-white-300">
            Views
          </span>
          <span className="p3-medium text-black-700 dark:text-white-200">
            65,132
          </span>
        </div>
        <div className="flex flex-col">
          <span className="p3-regular text-white-400 dark:text-white-300">
            Like
          </span>
          <span className="p3-medium text-black-700 dark:text-white-200">
            39,654
          </span>
        </div>
        <div className="flex flex-col">
          <span className="p3-regular text-white-400 dark:text-white-300">
            Comments
          </span>
          <span className="p3-medium text-black-700 dark:text-white-200">
            56
          </span>
        </div>
      </div>
    </li>
  );
};

export default PerformanceItem;
