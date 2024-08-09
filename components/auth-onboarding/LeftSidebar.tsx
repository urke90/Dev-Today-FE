'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------

interface ILeftSidebarProps {
  title: string;
  listItems: {
    imgUrl: string;
    alt: string;
    label: string;
    bgColor?: string;
  }[];
}

const LeftSidebar: React.FC<ILeftSidebarProps> = ({ title, listItems }) => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-light100__dark800 min-h-screen max-md:hidden px-5">
      <div className="mb-12 mt-9 md:ml-6 md:mb-20 max-md:mx-auto">
        {!isMounted ? (
          <Image
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            width={147}
            height={30}
            sizes="147x30"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
          />
        ) : (
          <Image
            src={`${
              resolvedTheme === 'dark'
                ? '/assets/icons/logo-dark.svg'
                : '/assets/icons/logo-light.svg'
            }`}
            alt="logo"
            width={147}
            height={30}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-md max-md:hidden flex flex-col gap-10">
          <h2 className="d1-bold">{title}</h2>
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
    </div>
  );
};

export default LeftSidebar;
