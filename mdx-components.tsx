import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'
import { PromoCard, SocSpacePromoCard } from '@/components/PromoCard'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    PromoCard,
    SocSpacePromoCard,
  }
}
