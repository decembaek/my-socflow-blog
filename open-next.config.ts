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
config.functions = {
  edge: {
    runtime: 'edge',
    patterns: [],
    routes: [
      // 전역 OG/Twitter 이미지 라우트
      'app/opengraph-image/route',
      'app/twitter-image/route',
      // 게시글별 OG 이미지 라우트
      'app/articles/[slug]/opengraph-image/route',
    ],
  },
}

export default config
