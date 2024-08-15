'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------

const LoadedAppThemeLogo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-[147px] h-[30px]">
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
  );
};

export default LoadedAppThemeLogo;
