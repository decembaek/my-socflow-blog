import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function TwitterImage() {
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
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
          Decembaek
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.85 }}>
          제주도에 거주하는 소프트웨어 디자이너이자 사업가
        </div>
        <div style={{ marginTop: 56, fontSize: 20, opacity: 0.75 }}>
          blog.socflow.app
        </div>
      </div>
    ),
    size,
  )
}


