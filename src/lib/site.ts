export function getSiteUrl() {
  // Cloudflare/Wrangler에서는 vars로 NEXT_PUBLIC_SITE_URL을 주입하고,
  // 로컬 개발 환경에서는 비어있을 수 있어 fallback을 둡니다.
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/$/, '')
  return 'http://localhost:3000'
}


