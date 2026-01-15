import glob from 'fast-glob'

export type ArticleCategory =
  | '제품 업데이트'
  | '활용법'
  | '트렌드'
  | '고객 사례'
  | '뉴스'
  | '이벤트'
  | '크리에이터 인터뷰'

interface Article {
  title: string
  description: string
  author: string
  date: string
  category?: ArticleCategory
}

export interface ArticleWithSlug extends Article {
  slug: string
}

function getArticleFilenamesFromWebpackContext() {
  // webpack 환경(Next 빌드/번들링)에서는 require.context를 사용할 수 있습니다.
  // (중요) require를 변수로 잡아 쓰면 "Critical dependency" 경고가 뜰 수 있어서
  // require.context를 직접 호출하는 형태로 유지합니다.
  try {
    const keys = require
      .context('../app/blog', true, /\/page\.mdx$/)
      .keys()
      .filter((key: string) => key.startsWith('./'))

    // './introducing-animaginary/page.mdx' -> 'introducing-animaginary/page.mdx'
    return keys.map((key: string) => key.slice(2))
  } catch {
    return null
  }
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  const { article } = (await import(`../app/blog/${articleFilename}`)) as {
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
      cwd: './src/app/blog',
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
