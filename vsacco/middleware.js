import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  if (token) {
    // Redirect logged-in users away from login page
    if (pathname === '/login') {
      if (token.isAdmin) {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
    }

    // Protect the /admin route
    if (pathname.startsWith('/profile')) {
      if (token.isAdmin) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    // Protect the /admin route
    if (pathname.startsWith('/admin')) {
      if (!token.isAdmin) {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
    }
  } else {
    // Redirect unauthenticated users away from protected routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!/static|_next/image|.*\\.png$).*)'],
};
