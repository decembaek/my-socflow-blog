import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/blog/*': ['./src/app/blog/**/*.mdx'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/uses',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
