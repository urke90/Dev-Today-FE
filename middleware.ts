import { NextRequest, NextResponse } from 'next/server';

// // ----------------------------------------------------------------

export const middleware = async (request: NextRequest) => {
  const result = await fetch(request.nextUrl.origin + '/api/user', {
    headers: {
      Cookie: request.cookies.toString(),
    },
  });

  // const session = await result.json();
  const session = await result.json();
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

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(request) {
//     const pathname = request.nextUrl.pathname;
//     const token = request.nextauth.token;

//     console.log('token', token);

//     const protectedPages = [
//       '/content',
//       '/posts',
//       '/meetups',
//       '/podcasts',
//       '/groups',
//       '/createPage',
//       '/profile',
//     ];
//     if (!token) {
//       if (
//         protectedPages.some((page) => pathname.includes(page)) ||
//         pathname === '/'
//       ) {
//         return NextResponse.redirect(new URL('/login', request.url));
//       }
//     } else {
//       if (pathname === '/') {
//         return NextResponse.redirect(new URL('/posts', request.url));
//       }

//       if (pathname.startsWith('/onboarding') && token.isOnboardingCompleted) {
//         return NextResponse.redirect(new URL('/posts', request.url));
//       }

//       if (
//         (pathname.startsWith('/register') || pathname.startsWith('/login')) &&
//         token.isOnboardingCompleted
//       ) {
//         return NextResponse.redirect(new URL('/posts', request.url));
//       }

//       if (
//         protectedPages.some((page) => pathname.includes(page)) &&
//         !token.isOnboardingCompleted
//       ) {
//         return NextResponse.redirect(new URL('/onboarding', request.url));
//       }
//     }
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//     pages: {
//       signIn: '/login',
//       newUser: '/register',
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//   }
// );

export const config = {
  matcher: '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
};
