import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import { SESSION_ORDER } from '@/data/sessions'

async function processMarkdownFile(filePath: string) {
  let raw: string
  try {
    raw = readFileSync(filePath, 'utf-8')
  } catch {
    notFound()
  }
  const { data: frontmatter, content } = matter(raw)
  const processedContent = await remark().use(remarkGfm).use(remarkHtml, { sanitize: true }).process(content)
  return { frontmatter, content: processedContent.toString() }
}

export async function getSessionContent(locale: string, sessionId: string) {
  const filePath = join(process.cwd(), 'docs', locale, `${sessionId}.md`)
  return processMarkdownFile(filePath)
}

export async function getArchitectureContent(locale: string) {
  const filePath = join(process.cwd(), 'docs', locale, 'architecture.md')
  return processMarkdownFile(filePath)
}

export async function getPerspectivesContent(locale: string) {
  const filePath = join(process.cwd(), 'docs', locale, 'perspectives.md')
  return processMarkdownFile(filePath)
}

export async function getMemoryVsFetchAiContent(locale: string) {
  const filePath = join(process.cwd(), 'docs', locale, 'memory-vs-fetch-ai-accuracy-and-cost.md')
  return processMarkdownFile(filePath)
}

export async function getArticleAccessControlContent(locale: string) {
  const filePath = join(process.cwd(), 'docs', locale, 'article-access-control.md')
  return processMarkdownFile(filePath)
}

export function getSessionIds(): string[] {
  return [...SESSION_ORDER]
}
