import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}


