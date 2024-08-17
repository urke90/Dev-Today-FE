import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

// ----------------------------------------------------------------

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      {children}
      <div className="sm:hidden">
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
