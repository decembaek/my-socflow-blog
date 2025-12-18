import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { EditorClient } from './EditorClient'

// 이 페이지는 로컬 개발용 전용입니다.
// 프로덕션 빌드에서는 항상 404를 반환합니다.

export default function EditorPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <Suspense>
      <EditorClient />
    </Suspense>
  )
}
