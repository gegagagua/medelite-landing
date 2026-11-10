import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip Next internals, API, static files, and anything with an extension
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
