export const LOCALES = ['en', 'ja'] as const

export type Locale = (typeof LOCALES)[number]

// (?=/|$) がないと /enterprise のような前方一致パスまで誤置換される
const LOCALE_PREFIX_RE = new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`)

export function switchLocalePath(pathname: string, toLocale: Locale): string {
  return pathname.replace(LOCALE_PREFIX_RE, `/${toLocale}`)
}

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  ja: 'ja_JP',
}

export function toOgLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? locale
}
