'use client';

import Image from 'next/image';
import ThemeLogo from '../shared/ThemeLogo';

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

const LeftSidebar: React.FC<ILeftSidebarProps> = ({
  title,
  listItems,
  isMounted,
  theme,
}) => {
  return (
    <div className="auth-onboarding-left-sidebar">
      <div className="mb-12 mt-9 md:ml-12 md:mb-20 max-md:mx-auto">
        <ThemeLogo isMounted={isMounted} theme={theme} />
      </div>
      <div className="max-w-md w-full max-md:hidden flex flex-col gap-10 mx-auto">
        <h1 className="d1-bold">{title}</h1>
        <ul className="flex flex-col gap-5">
          {listItems.map((item, index) => (
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
  );
};

export default LeftSidebar;
