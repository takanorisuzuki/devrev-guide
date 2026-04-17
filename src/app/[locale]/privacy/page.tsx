import type { Metadata } from 'next'
import Link from 'next/link'

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  const isJa = locale === 'ja'
  return {
    title: isJa ? 'プライバシーポリシー — DevRev Guide' : 'Privacy Policy — DevRev Guide',
    description: isJa
      ? 'DevRev Guideのプライバシーポリシー'
      : 'Privacy Policy for DevRev Guide',
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ja' }]
}

function PrivacyJa() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">アクセス解析について</h2>
        <p className="mb-3 leading-relaxed">
          本サイト（DevRev Guide）では、サービス改善のためにGoogle Analyticsを使用しています。
          Google Analyticsはアクセス情報の収集のためにCookieを使用します。
          このアクセス情報は匿名で収集されており、個人を特定するものではありません。
        </p>
        <p className="leading-relaxed">
          Google Analyticsの利用規約については、
          <a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-primary)' }}>
            Google Analyticsサービス利用規約
          </a>
          をご確認ください。また、Googleのプライバシーポリシーについては、
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-primary)' }}>
            Googleプライバシーポリシー
          </a>
          をご確認ください。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">収集する情報</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>ページの閲覧情報（どのページが閲覧されたか）</li>
          <li>利用しているブラウザとデバイスの種類</li>
          <li>参照元（どこからサイトに来たか）</li>
          <li>地域情報（国レベル。IPアドレスは匿名化されています）</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">収集しない情報</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>氏名、メールアドレスなどの個人情報</li>
          <li>アカウント情報（本サイトにはアカウント機能はありません）</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">お問い合わせ</h2>
        <p className="leading-relaxed">
          本プライバシーポリシーに関するご質問は、X（旧Twitter）の{' '}
          <a
            href="https://x.com/takanorisuzuki"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: 'var(--color-primary)' }}
          >
            @takanorisuzuki
          </a>
          {' '}までご連絡ください。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">改定</h2>
        <p className="leading-relaxed">
          本ポリシーは予告なく変更される場合があります。
          変更後のポリシーは本ページに掲載した時点から効力を生じるものとします。
        </p>
      </section>

      <p className="text-sm mt-8" style={{ color: 'var(--color-text-secondary)' }}>
        最終更新日: 2026年3月21日
      </p>
    </>
  )
}

function PrivacyEn() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Analytics</h2>
        <p className="mb-3 leading-relaxed">
          This site (DevRev Guide) uses Google Analytics to help us understand how visitors use the site.
          Google Analytics uses cookies to collect access information.
          This information is collected anonymously and does not personally identify you.
        </p>
        <p className="leading-relaxed">
          For more information, please see the{' '}
          <a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-primary)' }}>
            Google Analytics Terms of Service
          </a>
          {' '}and the{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-primary)' }}>
            Google Privacy Policy
          </a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Page view data (which pages are viewed)</li>
          <li>Browser and device type</li>
          <li>Referral source (how you arrived at the site)</li>
          <li>Geographic information (country level only; IP addresses are anonymized)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Information We Do Not Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Personal information such as names or email addresses</li>
          <li>Account information (this site does not have account features)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Contact</h2>
        <p className="leading-relaxed">
          If you have questions about this Privacy Policy, please contact us on X (formerly Twitter) at{' '}
          <a
            href="https://x.com/takanorisuzuki"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: 'var(--color-primary)' }}
          >
            @takanorisuzuki
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Changes</h2>
        <p className="leading-relaxed">
          We may update this Privacy Policy from time to time.
          Changes take effect when posted to this page.
        </p>
      </section>

      <p className="text-sm mt-8" style={{ color: 'var(--color-text-secondary)' }}>
        Last updated: March 21, 2026
      </p>
    </>
  )
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const isJa = locale === 'ja'

  return (
    <div className="w-full max-w-full" style={{ color: 'var(--color-text)' }}>
      {isJa ? <PrivacyJa /> : <PrivacyEn />}

      <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link
          href={`/${locale}`}
          className="text-sm underline"
          style={{ color: 'var(--color-primary)' }}
        >
          {isJa ? 'ホームに戻る' : 'Back to Home'}
        </Link>
      </div>
    </div>
  )
}
