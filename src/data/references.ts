export interface ReferenceEntry {
  slug: string
  icon: string
  label: { ja: string; en: string }
}

export const REFERENCES: ReferenceEntry[] = [
  {
    slug: 'architecture',
    icon: 'ref',
    label: { ja: 'オブジェクト構造', en: 'Object model' },
  },
  {
    slug: 'perspectives',
    icon: 'book',
    label: { ja: '視点（Perspectives）', en: 'Perspectives' },
  },
  {
    slug: 'memory-vs-fetch-ai-accuracy-and-cost',
    icon: 'mem',
    label: { ja: 'Memoryとコスト', en: 'Memory & cost' },
  },
  {
    slug: 'article-access-control',
    icon: 'art',
    label: { ja: 'Articleアクセス制御', en: 'Article access control' },
  },
  {
    slug: 'adaas-reference',
    icon: 'ref',
    label: { ja: 'ADaaS リファレンス', en: 'ADaaS Reference' },
  },
]

export function getReferenceSlug(): string[] {
  return REFERENCES.map((r) => r.slug)
}
