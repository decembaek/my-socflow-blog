import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { getAllArticles } from '@/lib/articles'
import { BlogClient } from './BlogClient'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: '게시글',
  description:
    '프로그래밍, 리더십, 제품 디자인 등에 대한 저의 오랜 생각들이 시간 순서대로 모아졌습니다.',
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()

  return (
    <Container className="mt-16 sm:mt-32">
      {/* 헤더 섹션 */}
      <div className="mb-16 rounded-2xl border border-zinc-100 bg-gradient-to-br from-violet-50 to-zinc-50 p-8 dark:border-zinc-700/40 dark:from-violet-900/20 dark:to-zinc-900">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            SocFlow 블로그
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            최신 AI 트렌드와 인사이트
            <br />
            이메일로 구독하고 최신 뉴스와 정보를 받아보세요.
          </p>
          <form
            action="/thank-you"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              aria-label="Email address"
              required
              disabled={true}
              className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-md shadow-zinc-800/5 outline-none placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-500 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
            />
            <button
              type="submit"
              disabled={true}
              className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              <MailIcon className="h-5 w-5" />
              구독하기
            </button>
          </form>
        </div>
      </div>

      {/* 게시글 목록 */}
      <BlogClient articles={articles} />
    </Container>
  )
}
