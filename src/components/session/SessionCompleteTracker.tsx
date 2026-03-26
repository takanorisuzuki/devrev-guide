'use client'

import { useEffect, useRef } from 'react'
import { trackSessionComplete } from '@/lib/analytics'

interface SessionCompleteTrackerProps {
  sessionId: string
  locale: string
}

/**
 * Invisible sentinel placed at the bottom of a session page.
 * When scrolled into view, fires a GA4 `session_complete` event once.
 */
export default function SessionCompleteTracker({ sessionId, locale }: SessionCompleteTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          trackSessionComplete(sessionId, locale)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sessionId, locale])

  return <div ref={ref} aria-hidden="true" style={{ height: 1 }} />
}
