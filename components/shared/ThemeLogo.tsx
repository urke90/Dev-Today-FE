'use client';

import Image from 'next/image';

// ----------------------------------------------------------------

interface IThemeLogoProps {
  isMounted: boolean;
  theme: string | undefined;
}

const ThemeLogo: React.FC<IThemeLogoProps> = ({ isMounted, theme }) => {
  return (
    <div className="h-[30px] w-[147px]">
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
            theme === 'dark'
              ? '/assets/icons/logo-dark.svg'
              : '/assets/icons/logo-light.svg'
          }`}
          alt="logo"
          width={147}
          height={30}
        />
      )}
    </div>
  );
};

export default ThemeLogo;
