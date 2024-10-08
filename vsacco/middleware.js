import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, cookieName: process.env.NODE_ENV === 'production'
    ? "__Secure-authjs.session-token"
    : "authjs.session-token",secret, });

  const { pathname } = req.nextUrl;

  if (token) {
    // // Redirect logged-in users away from login/register pages
    // if (pathname.startsWith('/login') || pathname.startsWith('/register') && token) {
    //   return NextResponse.redirect(new URL('/profile', req.url), { method: 'GET' });
    // }

    // Redirect admin to admin profile.
    if (pathname.startsWith('/profile') && token.isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url), { method: 'GET' });
    }

    // Protect the /admin route (Redirect non-admin logged in users to normal profile)
    if (pathname.startsWith('/admin') && !token.isAdmin) {
      return NextResponse.redirect(new URL('/profile', req.url), { method: 'GET' });
    }
  } else {
    // no token
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
