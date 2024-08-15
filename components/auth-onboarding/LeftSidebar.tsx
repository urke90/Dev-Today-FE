'use client';

import Image from 'next/image';
import LoadedAppThemeLogo from '../shared/LoadedAppThemeLogo';

// ----------------------------------------------------------------

interface ILeftSidebarProps {
  data: {
    title: string;
    listItems: {
      imgUrl: string;
      alt: string;
      label: string;
      bgColor?: string;
    }[];
  };
}

const LeftSidebar: React.FC<ILeftSidebarProps> = ({ data }) => {
  return (
    <div className="flex flex-col flex-1 bg-light100__dark800 min-h-screen max-md:hidden px-5 shrink-0">
      <div className="mb-12 mt-9 md:ml-6 md:mb-20 max-md:mx-auto">
        <LoadedAppThemeLogo />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-md max-md:hidden flex flex-col gap-10">
          <h2 className="d1-bold">{data.title}</h2>
          <ul className="flex flex-col gap-5">
            {data.listItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-5 rounded-lg bg-white-100 p-5 dark:bg-black-700 p1-medium"
              >
                <div
                  className={`flex-center dark:bg-black-800 ${item.bgColor} size-[60px] rounded-md shrink-0`}
                >
                  <Image
                    src={item.imgUrl}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                </div>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
