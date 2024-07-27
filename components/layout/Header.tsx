'use client';

import NavLinks from '../navigation/NavLinks';
import NavMenu from '../navigation/NavMenu';

import Image from 'next/image';

import { useTheme } from '@/context/ThemeProvider';
import Link from 'next/link';

// ----------------------------------------------------------------

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const { mode } = useTheme();

  const logoUrl =
    mode === 'dark'
      ? '/assets/images/logo-dark.svg'
      : '/assets/images/logo-light.svg';

  return (
    <header className="bg-light100__dark800 flex-between fixed left-0 top-0 z-50 w-full gap-5 px-3.5 py-4 lg:px-8 lg:py-5">
      <Link href="/" className="w-[147px] h-[30px] relative">
        <Image src={logoUrl} fill alt="Logo" />
      </Link>
      <div className="max-sm:hidden">
        <NavLinks />
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
