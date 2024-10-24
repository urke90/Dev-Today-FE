import ThemeProvider from '../context/ThemeProvider';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import QueryProvider from '@/context/QueryProvider';
import SessionProvider from '@/context/SessionProvider';
import { auth } from '@/lib/auth';
import './globals.css';

// ----------------------------------------------------------------

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Today',
  description:
    'DevToday is a content creation platform for developers. It offers a feed of dev news, podcasts, and events, keeping you up-to-date with the latest tech. It has interactive features like podcast audio playback, meetup maps, and more. You can think of it as the go-to developer community hub.',
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
            className={`${ibmPlexSans.className} bg-white-200 dark:bg-black-900 min-h-screen overflow-auto`}
          >
            <ThemeProvider>
              <Toaster
                toastOptions={{
                  className:
                    'dark:!bg-black-600 dark:!text-white-100 !bg-white-200 !text-white-400',
                }}
              />
              <main className="max-w-screen-xxl mx-auto">{children}</main>
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
};

export default RootLayout;
