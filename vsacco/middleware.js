import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  console.log('Token:', token);
  console.log('Pathname:', pathname);


  if (token) {
    // Redirect logged-in users away from login page
    if (pathname === '/login') { 
      if (token.isAdmin) {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
    }

    // Redirect admin to admin profile.
    if (pathname.startsWith('/profile')) {
      if (token.isAdmin) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    // Protect the /admin route (Redirect non-admin logged in users to normal profile)
    if (pathname.startsWith('/admin')) {
      if (!token.isAdmin) {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
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
