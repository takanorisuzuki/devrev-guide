import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'

export async function getSessionContent(locale: string, sessionId: string) {
  const filePath = join(process.cwd(), 'docs', locale, `${sessionId}.md`)
  let raw: string
  try {
    raw = readFileSync(filePath, 'utf-8')
  } catch {
    notFound()
  }
  const { data: frontmatter, content } = matter(raw)
  const processedContent = await remark().use(remarkHtml, { sanitize: true }).process(content)
  return { frontmatter, content: processedContent.toString() }
}

export function getSessionIds(): string[] {
  return ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13']
}
