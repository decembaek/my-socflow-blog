import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let title = slug
  let description = ''

  try {
    const mod = (await import(`../${slug}/page.mdx`)) as {
      article?: { title?: string; description?: string }
      metadata?: { title?: string; description?: string }
    }
    title = mod.metadata?.title ?? mod.article?.title ?? slug
    description = mod.metadata?.description ?? mod.article?.description ?? ''
  } catch {
    // ignore
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#0b1220',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15 }}>
          {title}
        </div>
        {description && (
          <div style={{ marginTop: 18, fontSize: 24, opacity: 0.85 }}>
            {description}
          </div>
        )}
        <div style={{ marginTop: 56, fontSize: 18, opacity: 0.75 }}>
          /articles/{slug}
        </div>
      </div>
    ),
    size,
  )
}
