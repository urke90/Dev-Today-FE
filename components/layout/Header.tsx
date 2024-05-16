'use client';

import Image from 'next/image';

import NavLinks from '../navigation/NavLinks';
import NavMenu from '../navigation/NavMenu';
import { useTheme } from '@/context/ThemeProvider';

// ----------------------------------------------------------------

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const { mode } = useTheme();

  const logoUrl =
    mode === 'dark'
      ? '/assets/images/logo-dark.svg'
      : '/assets/images/logo-light.svg';

  return (
    <header className="gap-5 bg-light100__dark800 flex-between px-3.5 py-4 lg:py-5 lg:px-8 w-full fixed top-0 left-0 z-50">
      <Image src={logoUrl} width={147} height={30} alt="Logo" />
      <div className="max-sm:hidden">
        <NavLinks />
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
