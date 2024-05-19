import { NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from './lib/routes';

export default auth(req => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated) {
    const url = new URL(DEFAULT_REDIRECT, nextUrl);

    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

	if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }
});

export const config = {
  matcher: [ '/((?!api|_next/static|_next/image|favicon.ico).*)' ],
};