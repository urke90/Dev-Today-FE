import SessionProvider from '../context/SessionProvider';
import { ThemeProvider } from '../context/ThemeProvider';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { IBM_Plex_Sans } from 'next/font/google';
import { cookies } from 'next/headers';

import QueryProvider from '@/context/QueryProvider';
import { authOptions } from '@/lib/auth-options';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const cookiesProvider = cookies();
  const theme =
    cookiesProvider.get('theme')?.value === 'dark' ? 'dark' : 'light';

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <QueryProvider>
          <html lang="en">
            <body
              className={`${ibmPlexSans.className} min-h-screen overflow-auto bg-white-200 dark:bg-black-900`}>
              <main className="mx-auto max-w-screen-xxl">{children}</main>
              <ReactQueryDevtools />
            </body>
          </html>
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
