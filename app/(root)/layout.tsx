import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      <Toaster
        toastOptions={{
          className: '!bg-black-600 !text-white-100',
        }}
      />
      {children}
      <div className="sm:hidden">
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
