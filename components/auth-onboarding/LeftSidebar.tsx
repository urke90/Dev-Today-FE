'use client';

import ThemeLogo from '../shared/ThemeLogo';

import Image from 'next/image';

// ----------------------------------------------------------------

interface ILeftSidebarProps {
  title: string;
  listItems: {
    imgUrl: string;
    alt: string;
    label: string;
    bgColor?: string;
  }[];
  isMounted: boolean;
  theme: string | undefined;
}

const colors = ['bg-[#FFECE6]', 'bg-[#FDF4EA]', 'bg-[#EBF2FC]'];

const LeftSidebar: React.FC<ILeftSidebarProps> = ({
  title,
  listItems,
  isMounted,
  theme,
}) => {
  return (
    <div className="auth-onboarding-left-sidebar">
      <div className="mb-12 mt-9 max-md:mx-auto md:mb-20 md:ml-12">
        <ThemeLogo isMounted={isMounted} theme={theme} />
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col gap-10 max-md:hidden">
        <h1 className="d1-bold">{title}</h1>
        <ul className="flex flex-col gap-5">
          {listItems.map((item, index) => (
            <li
              key={index}
              className="p1-medium bg-white-200 dark:bg-black-700 flex items-center gap-5 rounded-lg p-5"
            >
              <div
                className={`flex-center dark:bg-black-800 ${colors[index]} size-[60px] shrink-0 rounded-md`}
              >
                <Image
                  src={item.imgUrl}
                  alt={item.alt}
                  width={20}
                  height={20}
                  className="size-5 bg-transparent"
                />
              </div>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
