'use client';

import NavLinks from '../navigation/NavLinks';
import NavMenu from '../navigation/NavMenu';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeLogo from '../shared/ThemeLogo';

// ----------------------------------------------------------------

const Header: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-light100__dark800 flex-between fixed left-0 top-0 z-50 w-full gap-5 px-3.5 py-4 lg:px-8 lg:py-5">
      <Link href="/" className="w-[147px] h-[30px] relative">
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
