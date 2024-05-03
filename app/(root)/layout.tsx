import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ----------------------------------------------------------------

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
