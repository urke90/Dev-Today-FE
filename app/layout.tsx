import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeProvider';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import SessionProvider from './context/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

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
  const theme = cookiesProvider.get('theme')?.value || 'dark';

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <html lang="en" className={`${theme}`}>
          <body
            className={`${inter.className} min-h-screen dark:bg-black-900 bg-white-200`}
          >
            <main className="max-w-screen-xxl mx-auto">{children}</main>
          </body>
        </html>
      </SessionProvider>
    </ThemeProvider>
  );
}
