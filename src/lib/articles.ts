import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

function getArticleFilenamesFromWebpackContext() {
  // webpack 환경(Next 빌드/번들링)에서는 require.context를 사용할 수 있습니다.
  // Cloudflare Workers 런타임에서는 fs/glob이 동작하지 않을 수 있어, 이 경로가 더 안전합니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const req = typeof require !== 'undefined' ? (require as any) : undefined
  if (!req?.context) return null as string[] | null

  const keys = req
    .context('../app/articles', true, /\/page\.mdx$/)
    .keys()
    .filter((key: string) => key.startsWith('./'))

  // './introducing-animaginary/page.mdx' -> 'introducing-animaginary/page.mdx'
  return keys.map((key: string) => key.slice(2))
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  const { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  const articleFilenames =
    getArticleFilenamesFromWebpackContext() ??
    (await glob('*/page.mdx', {
      cwd: './src/app/articles',
    }))

  const articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

// Next.js `generateStaticParams` 헬퍼로 사용할 수 있는 유틸 함수입니다.
// 예: export async function generateStaticParams() { return getArticleStaticParams() }
export async function getArticleStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}
