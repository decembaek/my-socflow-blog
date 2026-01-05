import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { getSiteUrl } from '@/lib/site'

import '@/styles/tailwind.css'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Decembaek',
    default: 'Decembaek - 제주도에 거주하는 소프트웨어 디자이너이자 사업가',
  },
  description:
    '저는 제주도에 거주하는 소프트웨어 디자이너이자 사업가인 Decembaek 입니다. 저는 애니백의 창립자이자 CEO로, 일반 사람들도 스스로 자동화를 만들어서 작업할 수 있도록 지원하는 기술을 개발하고 있습니다.',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'Decembaek',
    title: 'Decembaek - 제주도에 거주하는 소프트웨어 디자이너이자 사업가',
    description:
      '저는 제주도에 거주하는 소프트웨어 디자이너이자 사업가인 Decembaek 입니다. 저는 애니백의 창립자이자 CEO로, 일반 사람들도 스스로 자동화를 만들어서 작업할 수 있도록 지원하는 기술을 개발하고 있습니다.',
    images: [
      {
        url: '/favicon.svg',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Decembaek - 제주도에 거주하는 소프트웨어 디자이너이자 사업가',
    description:
      '저는 제주도에 거주하는 소프트웨어 디자이너이자 사업가인 Decembaek 입니다. 저는 애니백의 창립자이자 CEO로, 일반 사람들도 스스로 자동화를 만들어서 작업할 수 있도록 지원하는 기술을 개발하고 있습니다.',
    images: ['/favicon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  verification: {
    google: 'EKS3Ee-LMkeWiHrc3KjvAE-caIODisQfXi8r7i87qyY',
    other: {
      'naver-site-verification': '1fb040d43bb206c941438a837c1597b192374b35',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
