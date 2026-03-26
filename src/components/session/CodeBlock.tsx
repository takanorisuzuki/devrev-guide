interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
      <code className={language ? `language-${language}` : ''}>{code}</code>
    </pre>
  )
}
