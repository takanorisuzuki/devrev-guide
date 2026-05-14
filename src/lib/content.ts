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

export async function getSessionContent(locale: string, sessionId: string) {
  return getDocContent(locale, sessionId)
}

export async function getArchitectureContent(locale: string) {
  return getDocContent(locale, 'architecture')
}

export async function getPerspectivesContent(locale: string) {
  return getDocContent(locale, 'perspectives')
}

export async function getMemoryVsFetchAiContent(locale: string) {
  return getDocContent(locale, 'memory-vs-fetch-ai-accuracy-and-cost')
}

export async function getArticleAccessControlContent(locale: string) {
  return getDocContent(locale, 'article-access-control')
}

export function getSessionIds(): string[] {
  return [...SESSION_ORDER]
}
