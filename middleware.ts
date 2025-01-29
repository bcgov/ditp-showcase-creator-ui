import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '@/i18n.config';

export function middleware(request: any) { // TODO name?
    return i18nRouter(request, i18nConfig)
}

export const config = { // TODO name?
    matcher: '/((?!api|static|.*\\\\..*|_next).*)'
}
