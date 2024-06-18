import Image from 'next/image';

type Props = {};

const ContentStats = (props: Props) => {
  return (
    <div className="bg-light100__dark800 space-y-5 p-5  rounded-2xl ">
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white-100 rounded">
          <Image
            src="/assets/icons/hart-violet.svg"
            width={25}
            height={25}
            alt="content stats"
            className="relative top-1 p-[1px] "
          />
        </div>
        <p className="p2-medium !text-white-400">24,056 Heart</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white-200 dark:bg-black-700 rounded">
          <Image
            src="/assets/icons/comments.svg"
            width={25}
            height={25}
            alt="content stats"
            className="relative p-1 "
          />
        </div>
        <p className="p2-medium !text-white-400">3086 Comments</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center size-6 bg-white-200 dark:bg-black-700  rounded">
          <Image
            src="/assets/icons/preview-gray.svg"
            width={25}
            height={25}
            alt="content stats"
            className="relative p-1"
          />
        </div>
        <p className="p2-medium !text-white-400">51,212 Views</p>
      </div>
    </div>
  );
};

export default ContentStats;
