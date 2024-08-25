'use client';

import NavLinks from '../navigation/NavLinks';
import NavMenu from '../navigation/NavMenu';
import ThemeLogo from '../shared/ThemeLogo';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------

const Header: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-light100__dark800 flex-between fixed left-0 top-0 z-50 w-full gap-5 px-3.5 py-4 lg:px-8 lg:py-5">
      <Link href="/" className="relative h-[30px] w-[147px]">
        <ThemeLogo isMounted={isMounted} theme={resolvedTheme} />
      </Link>
      <div className="max-sm:hidden">
        <NavLinks />
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
