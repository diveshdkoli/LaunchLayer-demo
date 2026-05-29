import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for the ones starting with:
  // - _next
  // - api
  // - everything containing a dot (e.g. favicon.ico, images, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
