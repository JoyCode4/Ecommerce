import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  const protectedPaths = ['/admin', '/'];  // Customize this as needed
  
  const excludedPaths = ['/login', '/signup', '/forgot', '/api', '/favicon.ico'];

  const pathname = req.nextUrl.pathname;
  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Apply middleware for protected paths
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();  // Proceed to the next middleware or page
}

export const config = {
    matcher: [
      /*
       * Apply middleware only to these pages:
       * Prevent it from applying to _next/static/, _next/image, fonts, etc.
       */
      '/((?!_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.css$|.*\\.js$).*)',
    ],
  };