'use client'

import { useEffect, useRef } from 'react'

interface SessionContentProps {
  content: string
}

export default function SessionContent({ content }: SessionContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const blocks = ref.current.querySelectorAll<HTMLElement>('code.language-mermaid')
    if (blocks.length === 0) return

    import('mermaid').then(({ default: mermaid }) => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: isDark ? 'dark' : 'neutral',
        themeVariables: isDark
          ? { background: '#1e1e2e', primaryColor: '#2d2d3f', primaryTextColor: '#e2e8f0', lineColor: '#6b7280' }
          : { primaryColor: '#eff6ff', primaryTextColor: '#1e3a5f', lineColor: '#6b7280' },
      })
      blocks.forEach((block, i) => {
        const id = `mermaid-${i}-${Date.now()}`
        const definition = block.textContent ?? ''
        const container = document.createElement('div')
        container.className = 'mermaid-diagram my-6'
        block.closest('pre')?.replaceWith(container)
        mermaid.render(id, definition)
          .then(({ svg }) => { container.innerHTML = svg })
          .catch(() => {
            const pre = document.createElement('pre')
            pre.style.cssText = 'opacity:0.5;font-size:0.75rem'
            pre.textContent = definition
            container.appendChild(pre)
          })
      })
    })
  }, [content])

  return (
    <div
      ref={ref}
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
