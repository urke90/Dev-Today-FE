import Image from 'next/image';

type Props = {};

const SharePost = (props: Props) => {
  return (
    <div className="flex items-center dark:bg-black-700 bg-white-400/10 py-2 rounded justify-center gap-1 ">
      <Image
        src="/assets/icons/share.svg"
        width={25}
        height={25}
        alt="share post"
        className="relative p-1 invert dark:invert-0"
      />
      <p className="p3-medium">Share Post</p>
    </div>
  );
};

export default SharePost;
