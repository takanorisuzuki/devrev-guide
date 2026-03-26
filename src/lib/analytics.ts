/**
 * GA4 custom event helpers.
 * These functions call gtag() only when it exists (production builds with GA4 loaded).
 */

type GtagEvent = {
  action: string
  params?: Record<string, string | number>
}

function sendEvent({ action, params }: GtagEvent) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params)
  }
}

/**
 * Fired when a user switches the site language.
 */
export function trackLanguageSwitch(fromLocale: string, toLocale: string) {
  sendEvent({
    action: 'language_switch',
    params: {
      from_locale: fromLocale,
      to_locale: toLocale,
    },
  })
}

/**
 * Fired when a user scrolls to the bottom of a session page (considered "complete").
 */
export function trackSessionComplete(sessionId: string, locale: string) {
  sendEvent({
    action: 'session_complete',
    params: {
      session_id: sessionId,
      locale,
    },
  })
}
