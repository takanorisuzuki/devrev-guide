import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { SESSION_ORDER } from '@/data/sessions'

const processMarkdownFile = cache(async (filePath: string) => {
  let raw: string
  try {
    raw = readFileSync(filePath, 'utf-8')
  } catch {
    notFound()
  }
  const { data: frontmatter, content } = matter(raw)
  const processedContent = await remark().use(remarkGfm).use(remarkHtml, { sanitize: true }).process(content)
  return { frontmatter, content: processedContent.toString() }
})

export const getDocContent = cache(async (locale: string, slug: string) => {
  const filePath = join(process.cwd(), 'docs', locale, `${slug}.md`)
  return processMarkdownFile(filePath)
})

export function getSessionIds(): string[] {
  return [...SESSION_ORDER]
}
