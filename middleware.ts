import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/jwt';

/**
 * Global authentication middleware for UI routes and API endpoints.
 * Note: Next.js 16.1.6 suggests 'proxy.ts', but we use 'middleware.ts' here.
 * Ensure 'proxy.ts' is deleted to avoid conflicts.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES & ASSETS
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api/auth') || 
    pathname === '/login' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. SESSION VALIDATION
  const session = request.cookies.get('session')?.value;

  if (!session) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. TOKEN VERIFICATION
  try {
    const decoded = await decrypt(session);
    
    if (!decoded) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, message: "Invalid or expired session" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. REDIRECTS
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/destinations', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, message: "Security validation failed" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|favicon.ico).*)',
  ],
};
