import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getArticleStaticParams } from '@/lib/articles'
import { getSiteUrl } from '@/lib/site'

export const dynamicParams = false

// 빌드 시점에 모든 글의 slug를 수집해서 정적으로 미리 생성
export async function generateStaticParams() {
  return getArticleStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const mod = (await import(`../${slug}/page.mdx`)) as {
      article?: {
        title?: string
        description?: string
        author?: string
        date?: string
      }
      metadata?: {
        title?: string
        description?: string
      }
    }

    const title = mod.metadata?.title ?? mod.article?.title ?? slug
    const description =
      mod.metadata?.description ?? mod.article?.description ?? ''

    return {
      title,
      description,
      alternates: {
        canonical: `/articles/${slug}`,
      },
      openGraph: {
        type: 'article',
        url: `/articles/${slug}`,
        title,
        description,
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
    }
  } catch {
    return {
      alternates: {
        canonical: `/articles/${slug}`,
      },
    }
  }
}

// 각 slug에 대해 기존 MDX 페이지(`../{slug}/page.mdx`)를 그대로 렌더링
export default async function ArticlePage({
  params,
}: {
  // Next 15.x 타입 생성(.next/types) 기준으로 params가 Promise로 내려오는 경우가 있어
  // 배포 빌드 타입체크를 통과하려면 Promise 형태로 맞춰준다.
  params: Promise<{ slug: string }>
}) {
  try {
    const { slug } = await params

    const mod = (await import(`../${slug}/page.mdx`)) as {
      default: React.ComponentType
      article?: {
        title?: string
        description?: string
        author?: string
        date?: string
      }
    }

    const MDXContent = mod.default

    const siteUrl = getSiteUrl()
    const jsonLd = mod.article?.title
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: mod.article.title,
          description: mod.article.description,
          datePublished: mod.article.date,
          author: mod.article.author
            ? { '@type': 'Person', name: mod.article.author }
            : undefined,
          mainEntityOfPage: `${siteUrl}/articles/${slug}`,
        }
      : null

    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <MDXContent />
      </>
    )
  } catch {
    notFound()
  }
}
