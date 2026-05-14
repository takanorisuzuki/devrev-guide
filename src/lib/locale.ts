const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  ja: 'ja_JP',
}

export function toOgLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? locale
}
