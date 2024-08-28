import ThemeProvider from '../context/ThemeProvider';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import QueryProvider from '@/context/QueryProvider';
import { auth } from '@/lib/auth';
import SessionProvider from '@/context/SessionProvider';
import './globals.css';

// ----------------------------------------------------------------

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${ibmPlexSans.className} min-h-screen overflow-auto bg-white-200 dark:bg-black-900`}
          >
            <ThemeProvider>
              <Toaster
                toastOptions={{
                  className: '!bg-black-600 !text-white-100',
                }}
              />
              <main className="mx-auto max-w-screen-xxl">{children}</main>
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
};

export default RootLayout;
