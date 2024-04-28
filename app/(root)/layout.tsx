import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ----------------------------------------------------------------

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
