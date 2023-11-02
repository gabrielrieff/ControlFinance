import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@nextauth.token');

  if (request.nextUrl.pathname === '/' && token?.value) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return;
}

export const config = {
  matcher: ['/dashboard/:path*', '/']
};
