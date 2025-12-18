import { notFound } from 'next/navigation'

import { getArticleStaticParams } from '@/lib/articles'

type PageProps = {
  params: {
    slug: string
  }
}

// 빌드 시점에 모든 글의 slug를 수집해서 정적으로 미리 생성
export async function generateStaticParams() {
  return getArticleStaticParams()
}

// 각 slug에 대해 기존 MDX 페이지(`../{slug}/page.mdx`)를 그대로 렌더링
export default async function ArticlePage({ params }: PageProps) {
  try {
    const mod = (await import(`../${params.slug}/page.mdx`)) as {
      default: React.ComponentType
    }

    const MDXContent = mod.default

    return <MDXContent />
  } catch {
    notFound()
  }
}


