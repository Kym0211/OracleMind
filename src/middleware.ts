import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ['/'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
  const isAuthPath = pathname.startsWith('/dashboard');
    // console.log("isPublicPath", isPublicPath);
    // console.log("isAuthPath", isAuthPath);
    // console.log("token", token);
  if (token) {
    // Authenticated user tries to access public pages => redirect to dashboard
    if (isPublicPath && !isAuthPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Authenticated user accesses protected pages => allow
    if (isAuthPath) {
      return NextResponse.next();
    }
    // Allow other paths
    return NextResponse.next();
  } else {
    // No token => accessing public page => allow
    if (isPublicPath && !isAuthPath) {
      return NextResponse.next();
    }
    // No token accessing protected routes => redirect to '/'
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
