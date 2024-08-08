'use client';

import Image from 'next/image';
import NavLinks from '../navigation/NavLinks';
import NavMenu from '../navigation/NavMenu';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------

const generateLogoSrc = (theme: string | undefined) => {
  switch (theme) {
    case 'dark': {
      return;
    }
    case 'light': {
      return;
    }
    default: {
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
  }
};

const Header: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-light100__dark800 flex-between fixed left-0 top-0 z-50 w-full gap-5 px-3.5 py-4 lg:px-8 lg:py-5">
      <Link href="/" className="w-[147px] h-[30px] relative">
        {!isMounted ? (
          <Image
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            width={36}
            height={36}
            sizes="36x36"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
          />
        ) : (
          <Image
            src={
              resolvedTheme === 'dark'
                ? '/assets/images/logo-dark.svg'
                : '/assets/images/logo-light.svg'
            }
            fill
            alt="Logo"
          />
        )}
      </Link>
      <div className="max-sm:hidden">
        <NavLinks />
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
