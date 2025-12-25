import type { MetadataRoute } from 'next'

import { getAllArticles } from '@/lib/articles'
import { getSiteUrl } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticRoutes = ['/', '/about', '/articles', '/projects', '/uses'].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
    }),
  )

  const articles = await getAllArticles()
  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }))

  return [...staticRoutes, ...articleRoutes]
}


