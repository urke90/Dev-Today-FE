import { IContent } from '@/types/content';
import { formatDate } from '@/utils/format';
import Image from 'next/image';
import SharePost from './SharePost';

type ContentProps = {
  content: IContent;
  authorName: string;
};

const LeftSideBar = ({ content, authorName }: ContentProps) => {
  return (
    <aside className="left-sidebar !p-0 ">
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
          <p className="p2-medium !text-white-400">
            {content?.likesCount ? `${content.likesCount} Heart` : ' no likes'}
          </p>
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
          <p className="p2-medium !text-white-400">
            {content?.commentsCount
              ? `${content.commentsCount} Comments`
              : ' No comments'}
          </p>
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
          <p className="p2-medium !text-white-400">
            {content?.viewsCount ? `${content.viewsCount} Views` : ' No views'}
          </p>
        </div>
      </div>
      <SharePost />
      <div className="bg-light100__dark800  p-5  rounded-2xl p2-medium !text-white-400 ">
        <span className="text-blue-500">{authorName} </span> Posted on <br />
        {formatDate(content?.createdAt)}
      </div>
    </aside>
  );
};
export default LeftSideBar;
