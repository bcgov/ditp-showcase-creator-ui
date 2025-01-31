import { i18nRouter } from "next-i18n-router"
import i18nConfig from "@/i18n.config";

export function middleware(request: any) {
    return i18nRouter(request, i18nConfig)
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }