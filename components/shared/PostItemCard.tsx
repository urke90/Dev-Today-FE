'use client';

import Image from 'next/image';
import HeartIcon from '../icons/Heart';
import BadgeItem from './BadgeItem';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface IPostItemCardProps {
  imgUrl: string;
}
// width={165} height={165}

const PostItemCard: React.FC<IPostItemCardProps> = ({ imgUrl }) => {
  return (
    <li className="flex md:items-center p-4 md:p-5 gap-4 bg-light100__dark800 rounded-2xl">
      <div className="relative size-[100px] md:size-[165px] shrink-0">
        <Image src={imgUrl} fill alt="post" className="shrink-0" />
      </div>
      {/* RIGHT PART OF THE POST */}
      <div className="flex flex-col gap-4">
        <div className="flex mb-4">
          <div>
            <p className="p1-bold mb-2">
              What is the ideal Tech stack to build a website in 2024? 👨‍💻
            </p>
            <p className="p3-regular line-clamp-1">
              The post discusses the author's preferred tech stack for building
              a website in 2024, including the use of Typescript, Reactjs or
              Vuejs, Postgres, and Redis.
            </p>
          </div>
          <Button
            className="size-[30px] bg-white-200 dark:bg-black-700 flex-center rounded-full shrink-0"
            onClick={() => alert('radi btn')}
          >
            <HeartIcon className="text-white-300" />
          </Button>
        </div>
        <ul className="flex gap-2.5">
          <BadgeItem title="finance" />
          <BadgeItem title="bitcoin" />
          <BadgeItem title="crypto" />
        </ul>
        <div className="flex-between flex-wrap gap-5">
          <div className="flex">
            <div className="bg-[#F0F1FE] rounded-full size-[40px] flex-center mr-2.5">
              <Image
                src="/assets/images/avatars/avatar-1.svg"
                width={28}
                height={34}
                alt="avatar"
              />
            </div>
            <div>
              <p className="p3-bold">Pavel Gvay</p>
              <p className="subtitle-normal">3 weeks ago</p>
            </div>
          </div>
          <div className="flex gap-[30px] text-white-400 dark:text-white-300">
            <span className="p3-regular">651,324 Views</span>
            <span className="p3-regular">36,6545 Likes</span>
            <span className="p3-regular">56 comments</span>
          </div>
        </div>
      </div>
      {/* RIGHT PART OF THE POST */}
    </li>
  );
};

export default PostItemCard;

// <li className="flex p-2 md:p-5 gap-4 bg-light100__dark800 rounded-2xl">
//       <Image src={imgUrl} width={165} height={165} alt="post" />
//       {/* RIGHT PART OF THE POST */}
//       <div>
//         <div className="flex mb-4">
//           <div>
//             <p className="p1-bold mb-2">
//               What is the ideal Tech stack to build a website in 2024? 👨‍💻
//             </p>
//             <p className="p3-regular line-clamp-1">
//               The post discusses the author's preferred tech stack for building
//               a website in 2024, including the use of Typescript, Reactjs or
//               Vuejs, Postgres, and Redis.
//             </p>
//           </div>
//           <Button
//             className="size-[30px] bg-white-200 dark:bg-black-700 flex-center rounded-full shrink-0"
//             onClick={() => alert('radi btn')}
//           >
//             <HeartIcon className="text-white-300" />
//           </Button>
//         </div>
//         <ul className="flex gap-2.5 mb-6">
//           <BadgeItem title="finance" />
//           <BadgeItem title="bitcoin" />
//           <BadgeItem title="crypto" />
//         </ul>
//         <div className="flex-between flex-wrap gap-5">
//           <div className="flex">
//             <div className="bg-[#F0F1FE] rounded-full size-[40px] flex-center mr-2.5">
//               <Image
//                 src="/assets/images/avatars/avatar-1.svg"
//                 width={28}
//                 height={34}
//                 alt="avatar"
//               />
//             </div>
//             <div>
//               <p className="p3-bold">Pavel Gvay</p>
//               <p className="subtitle-normal">3 weeks ago</p>
//             </div>
//           </div>
//           <div className="flex gap-[30px] text-white-400 dark:text-white-300">
//             <span className="p3-regular">651,324 Views</span>
//             <span className="p3-regular">36,6545 Likes</span>
//             <span className="p3-regular">56 comments</span>
//           </div>
//         </div>
//       </div>
//       {/* RIGHT PART OF THE POST */}
//     </li>
