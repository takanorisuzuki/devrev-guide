import { NextRequest, NextResponse } from 'next/server'
import { LOCALES } from '@/lib/locale'

const VALID_LOCALES = new Set<string>(LOCALES)

export function proxy(request: NextRequest) {
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
