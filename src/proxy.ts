import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";

const handleI18n = createMiddleware(routing);
export default function proxy(request: NextRequest) {
  if (!/^\/(en|es|pt)(\/|$)/.test(request.nextUrl.pathname)) {
    // Native, relative Next.js rewrites preserve English URLs without the
    // host-sensitive absolute middleware rewrite used for default locales.
    const headers = new Headers(request.headers);
    headers.set("X-NEXT-INTL-LOCALE", "en");
    return NextResponse.next({ request: { headers } });
  }
  return handleI18n(request);
}
export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] };
