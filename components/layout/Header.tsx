'use client';

import Image from 'next/image';

import NavLinks from './NavLinks';
import NavMenu from './NavMenu';

import { useTheme } from '@/app/context/ThemeProvider';

// ----------------------------------------------------------------

interface IHeaderProps {}

/**
 * LIGHT MODE
 *     - text-white-400
 * DARK MODE
 *     - text-white-300
 * TODO: figure out how to render active link later
 */

const Header: React.FC<IHeaderProps> = (props) => {
  const { mode } = useTheme();

  const logoUrl =
    mode === 'dark'
      ? '/assets/images/logo-dark.svg'
      : '/assets/images/logo-light.svg';

  return (
    <header className="bg-white-100__dark-black-800 flex justify-between items-center py-5 px-8 w-full fixed z-50">
      <Image src={logoUrl} width={147} height={30} alt="Logo" />
      <div className="max-md:hidden">
        <NavLinks />
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
