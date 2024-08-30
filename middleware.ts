import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------

export const middleware = async (request: NextRequest) => {
  console.log('REQ. NEXT URL ORIGIN', request.nextUrl.origin);

  const result = await fetch(request.nextUrl.origin + '/api/user', {
    headers: {
      Cookie: request.cookies.toString(),
    },
  });

  const session = await result.json();
  console.log('SESSION', session);
  // const session = true;
  const url = request.nextUrl.pathname;

  const protectedPages = [
    '/content',
    '/posts',
    '/meetups',
    '/podcasts',
    '/groups',
    '/createPage',
    '/profile',
  ];

  if (!session) {
    if (protectedPages.some((page) => url.includes(page)) || url === '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (url === '/') {
      return NextResponse.redirect(new URL('/posts', request.url));
    }

    if (url.startsWith('/onboarding') && session.user.isOnboardingCompleted) {
      return NextResponse.redirect(new URL('/posts', request.url));
    }

    if (
      (url.startsWith('/register') || url.startsWith('/login')) &&
      session.user.isOnboardingCompleted
    ) {
      return NextResponse.redirect(new URL('/posts', request.url));
    }
    if (
      protectedPages.some((page) => url.includes(page)) &&
      !session.user.isOnboardingCompleted
    ) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
};
