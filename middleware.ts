import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const result = await fetch('http://localhost:3000/api/user', {
    headers: {
      Cookie: request.cookies.toString(),
    },
  });

  const session = await result.json();

  const url = request.nextUrl.pathname;

  const protectedPages = [
    '/home',
    '/posts',
    '/meetup',
    '/podcast',
    '/groups',
    '/createPage',
    '/profile',
  ];

  if (!session) {
    if (protectedPages.some((page) => url.includes(page))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (url.startsWith('/register') && session.user.isOnboardingCompleted) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    if (url.startsWith('/login') && session.user.isOnboardingCompleted) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    if (
      protectedPages.some((page) => url.includes(page)) &&
      !session.user.isOnboardingCompleted
    ) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
};
