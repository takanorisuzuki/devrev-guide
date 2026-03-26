import { NextRequest, NextResponse } from 'next/server'

const VALID_LOCALES = new Set(['en', 'ja'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/')
  const locale = segments[1]
  if (locale && !VALID_LOCALES.has(locale) && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/en', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon|public).*)'],
}
