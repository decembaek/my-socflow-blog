import { notFound } from 'next/navigation'

import { getArticleStaticParams } from '@/lib/articles'

// 빌드 시점에 모든 글의 slug를 수집해서 정적으로 미리 생성
export async function generateStaticParams() {
  return getArticleStaticParams()
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
    }

    const MDXContent = mod.default

    return <MDXContent />
  } catch {
    notFound()
  }
}
