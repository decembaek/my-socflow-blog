import { defineCloudflareConfig } from '@opennextjs/cloudflare'

const config = defineCloudflareConfig({
  // Uncomment to enable R2 cache,
  // It should be imported as:
  // `import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";`
  // See https://opennext.js.org/cloudflare/caching for more details
  // incrementalCache: r2IncrementalCache,
})

// OpenNext는 Edge runtime(예: next/og로 생성되는 opengraph-image 라우트)을
// 별도의 edge 함수 번들로 분리해야 합니다.
// next/og 기반 이미지 라우트는 OpenNext/Cloudflare 런타임에서 500이 발생해 제거했습니다.
// (필요하면 public/og.png 같은 정적 이미지로 대체 권장)

export default config
