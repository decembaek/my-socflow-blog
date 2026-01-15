'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type ArticleWithSlug, type ArticleCategory } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

const CATEGORIES: ArticleCategory[] = [
  '제품 업데이트',
  '활용법',
  '트렌드',
  '고객 사례',
  '뉴스',
  '이벤트',
  '크리에이터 인터뷰',
]

export function BlogClient({ articles }: { articles: ArticleWithSlug[] }) {
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory | '전체'>('전체')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = useMemo(() => {
    let filtered = articles

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory,
      )
    }

    // 검색 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [articles, selectedCategory, searchQuery])

  return (
    <div className="space-y-8">
      {/* 검색 및 필터 */}
      <div className="space-y-4">
        {/* 검색 입력 */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-500 dark:focus:border-violet-400"
          />
          <svg
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('전체')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === '전체'
                ? 'bg-violet-500 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            See All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-violet-500 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 게시글 그리드 */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-violet-500 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-violet-400"
            >
              {article.category && (
                <span className="inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                  {article.category}
                </span>
              )}
              <h3 className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-violet-600 dark:text-zinc-100 dark:group-hover:text-violet-400">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                {article.description}
              </p>
              <time
                dateTime={article.date}
                className="mt-4 block text-xs text-zinc-400 dark:text-zinc-500"
              >
                {formatDate(article.date)}
              </time>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            검색 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  )
}