'use client'

import { useEffect, useState } from 'react'
import { ArticleLayout } from '@/components/ArticleLayout'

type ImageItem = {
  id: string
  name: string
  previewUrl: string
  suggestedPath: string
  alt: string
}

export function EditorClient() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [images, setImages] = useState<ImageItem[]>([])

  useEffect(() => {
    return () => {
      // 미리보기 URL 정리
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl))
    }
  }, [images])

  const article = {
    slug: slug || 'preview-slug',
    title: title || '제목을 입력하세요',
    description: description || '설명을 입력하세요',
    author: author || '작성자',
    date: date || new Date().toISOString().slice(0, 10),
  }

  const imagesSnippet =
    images.length === 0
      ? ''
      : images
          .map((img) => `![${img.alt || img.name}](${img.suggestedPath})`)
          .join('\n')

  const mdxSource = `import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: '${author || '작성자'}',
  date: '${date || new Date().toISOString().slice(0, 10)}',
  title: '${title || '제목'}',
  description:
    '${description || '설명'}',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />

${body}

${imagesSnippet}
`

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const nextImages: ImageItem[] = []

    Array.from(files).forEach((file) => {
      const id = `${file.name}-${file.size}-${file.lastModified}`
      const previewUrl = URL.createObjectURL(file)
      const suggestedPath = `/images/${slug || 'my-article'}/${file.name}`

      nextImages.push({
        id,
        name: file.name,
        previewUrl,
        suggestedPath,
        alt: file.name,
      })
    })

    setImages((prev) => [...prev, ...nextImages])
    // input 값을 비워서 같은 파일을 다시 선택할 수 있게 함
    event.target.value = ''
  }

  const handleAltChange = (id: string, alt: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, alt } : img)),
    )
  }

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id)
      if (target) {
        URL.revokeObjectURL(target.previewUrl)
      }
      return prev.filter((img) => img.id !== id)
    })
  }

  return (
    <div className="px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">
        로컬 글쓰기 에디터 (dev 전용)
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        이 페이지는 로컬 개발용입니다. 이미지는 실제로 서버에 저장되지 않으며,
        아래에 제안되는 경로대로 파일을 레포의 public 또는 src/images 폴더에
        수동으로 저장해야 합니다.
      </p>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Slug</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="my-new-article"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">제목</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">설명</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">작성자</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">날짜</label>
              <input
                type="date"
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              본문 (Markdown/MDX)
            </label>
            <textarea
              className="h-64 w-full rounded-md border px-3 py-2 font-mono text-sm"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="여기에 MDX 본문을 작성하세요..."
            />
          </div>

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium">
              이미지 업로드 (로컬 미리보기용)
            </label>
            <p>
              메뉴얼 : ![웹 상에 보이는 이미지 부제목](파일경로/파일이름.png)
            </p>
            <p>
              {/* "<Image src={firstImage} alt="SocFlow 공식 사이트" />"" */}
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
            />
            {images.length > 0 && (
              <div className="mt-2 space-y-3">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="flex gap-3 rounded-md border px-3 py-2 text-xs"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.previewUrl}
                        alt={img.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="font-medium">{img.name}</div>
                      <div className="text-[11px] text-gray-500">
                        제안 경로: <code>{img.suggestedPath}</code>
                      </div>
                      <input
                        className="w-full rounded-md border px-2 py-1 text-xs"
                        placeholder="alt 텍스트"
                        value={img.alt}
                        onChange={(e) =>
                          handleAltChange(img.id, e.target.value)
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="self-start text-[11px] text-red-500"
                      onClick={() => handleRemoveImage(img.id)}
                    >
                      제거
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              생성된 MDX 소스 (복사해서 src/app/articles/{'{'}slug{'}'}/page.mdx
              에 저장)
            </label>
            <textarea
              readOnly
              className="h-64 w-full rounded-md border bg-gray-50 px-3 py-2 font-mono text-xs"
              value={mdxSource}
            />
          </div>
        </div>

        <div className="overflow-auto rounded-xl border p-4">
          <h2 className="mb-4 text-sm font-semibold">실시간 미리보기</h2>
          <ArticleLayout article={article}>
            <div className="prose-slate prose max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">
                {body || '여기에 본문 미리보기가 표시됩니다.'}
              </div>
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {images.map((img) => (
                    <figure key={img.id} className="space-y-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.previewUrl}
                        alt={img.alt}
                        className="w-full rounded-lg border object-cover"
                      />
                      <figcaption className="text-xs text-gray-500">
                        {img.alt || img.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </ArticleLayout>
        </div>
      </div>
    </div>
  )
}
