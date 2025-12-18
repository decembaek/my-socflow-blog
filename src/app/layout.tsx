import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Decembaek',
    default: 'Decembaek - 제주도에 거주하는 소프트웨어 디자이너이자 사업가',
  },
  description:
    '저는 제주도에 거주하는 소프트웨어 디자이너이자 사업가인 Decembaek 입니다. 저는 애니백의 창립자이자 CEO로, 일반 사람들도 스스로 자동화를 만들어서 작업할 수 있도록 지원하는 기술을 개발하고 있습니다.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
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
