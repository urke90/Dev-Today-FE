import NavLinks from '../navigation/NavLinks';

// ----------------------------------------------------------------

const Footer = () => {
  return (
    <footer className="bg-white-100__dark-black-800 fixed bottom-0 w-full lg:hidden flex-center left-0 z-50 py-[18px] px-5">
      <NavLinks />
    </footer>
  );
};

export default Footer;
