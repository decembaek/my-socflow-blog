import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

type PromoCardProps = {
  title: string
  description: string
  href: string
  cta?: string
  badge?: string
  logo?: ImageProps['src']
  logoAlt?: string
  className?: string
}

export function PromoCard({
  title,
  description,
  href,
  cta = '바로가기',
  badge,
  logo,
  logoAlt = '',
  className,
}: PromoCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        className,
        'not-prose group relative block overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm',
        'transition hover:-translate-y-0.5 hover:shadow-md focus:ring-2 focus:ring-teal-500/30 focus:outline-none',
        'dark:border-zinc-700/60 dark:bg-zinc-900/40',
      )}
      aria-label={`${title}로 이동`}
    >
      <div className="flex items-start gap-4">
        {logo && (
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-zinc-100 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
            <Image
              src={logo}
              alt={logoAlt}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {badge && (
              <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                {badge}
              </span>
            )}
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </div>
          </div>
          <div className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {description}
          </div>
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:text-teal-700 dark:text-teal-400 dark:group-hover:text-teal-300">
            {cta}
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function SocSpacePromoCard(
  props: Omit<PromoCardProps, 'title' | 'href'>,
) {
  return (
    <PromoCard
      title="Soc Space — 맥 저장 공간 정리 앱"
      href="https://socspace.app"
      badge="내 웹서비스"
      cta="socspace.app"
      {...props}
    />
  )
}
