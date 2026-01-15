'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import logoSocFlow from '@/images/logos/socflow.png'

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  )
}

function ArrowRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  )
}

function SparkleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
        fill="currentColor"
      />
      <path
        d="M19 2L19.79 5.58L23 6L19.79 6.42L19 10L18.21 6.42L15 6L18.21 5.58L19 2Z"
        fill="currentColor"
      />
      <path
        d="M5 14L5.79 17.58L9 18L5.79 18.42L5 22L4.21 18.42L1 18L4.21 17.58L5 14Z"
        fill="currentColor"
      />
    </svg>
  )
}

const features = [
  {
    name: '게시물 관리',
    description:
      '모든 소셜 네트워크 게시물을 한 곳에서 작성, 스케줄링, 관리하세요.',
    icon: CheckIcon,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: '소셜 계정 연동',
    description:
      'Instagram, Twitter, Facebook 등 여러 소셜 계정을 간편하게 연결하세요.',
    icon: CheckIcon,
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    name: '미디어 관리',
    description:
      '이미지와 동영상을 중앙에서 관리하고 여러 플랫폼에 공유하세요.',
    icon: CheckIcon,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'API 통합',
    description: '강력한 API로 자동화 워크플로우를 구축하고 생산성을 높이세요.',
    icon: CheckIcon,
    gradient: 'from-violet-500 to-indigo-600',
  },
]

const benefits = [
  {
    title: '시간 절약',
    description:
      '여러 플랫폼을 오가며 게시물을 올리지 마세요. 한 번의 작성으로 모든 소셜 미디어에 동시에 게시할 수 있습니다.',
    icon: '⏱️',
    stat: '70%',
    statLabel: '시간 절약',
  },
  {
    title: '일관성 유지',
    description:
      '브랜드 메시지와 톤앤매너를 모든 플랫폼에서 일관되게 유지하세요.',
    icon: '✨',
    stat: '100%',
    statLabel: '일관성',
  },
  {
    title: '데이터 인사이트',
    description:
      '통합 대시보드에서 모든 소셜 미디어 성과를 한눈에 확인하고 분석하세요.',
    icon: '📊',
    stat: '360°',
    statLabel: '통합 분석',
  },
]

const useCases = [
  {
    title: '콘텐츠 크리에이터',
    description:
      '여러 플랫폼에서 활동하는 크리에이터라면, SocFlow로 게시물 일관성을 유지하고 시간을 절약하세요.',
    icon: '🎬',
  },
  {
    title: '소상공인 및 스타트업',
    description:
      '제한된 리소스로 효과적인 소셜 미디어 마케팅이 필요하다면, SocFlow로 효율성을 높이세요.',
    icon: '🚀',
  },
  {
    title: '마케팅 팀',
    description:
      '여러 계정을 관리하는 마케팅 담당자라면, 통합 대시보드로 워크플로우를 간소화하세요.',
    icon: '👥',
  },
  {
    title: '개발자',
    description:
      '자동화된 소셜 미디어 공유가 필요하다면, SocFlow API로 워크플로우에 통합하세요.',
    icon: '⚡',
  },
]

function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(currentRef)

    return () => {
      observer.unobserve(currentRef)
    }
  }, [])

  return { ref, isIntersecting }
}

function AnimatedSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, isIntersecting } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function CounterAnimation({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number | string
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState<number | string>(0)
  const { ref, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (!isIntersecting) return

    if (typeof end === 'string') {
      setCount(end)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOutQuad = 1 - (1 - progress) * (1 - progress)
      const current = Math.floor(startValue + (end - startValue) * easeOutQuad)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animate()
  }, [isIntersecting, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function AboutClient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Hero Section with Animated Background */}
      <div className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2), transparent 60%)`,
            transition: 'background 0.4s ease-out',
          }}
        />
        {/* Gradient Orbs */}
        <div className="animate-float pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="animate-float-delayed pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative mx-auto mt-16 w-full max-w-6xl sm:mt-32">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-8 flex justify-center">
                <div className="group relative">
                  <div className="absolute -inset-1 animate-pulse rounded-3xl bg-linear-to-r from-violet-600 to-purple-600 opacity-30 blur-lg transition duration-1000 group-hover:opacity-50 group-hover:duration-200" />
                  <div className="relative h-28 w-28 transform rounded-3xl bg-linear-to-br from-violet-500 to-purple-600 p-3 shadow-2xl shadow-violet-500/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={logoSocFlow}
                      alt="SocFlow 로고"
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl dark:text-zinc-100">
                소셜 계정을 한곳에서
                <br />
                <span className="animate-gradient bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  관리하는
                </span>{' '}
                플랫폼
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                SocFlow는 여러 소셜 네트워크 계정을 하나의 대시보드에서 통합
                관리할 수 있게 해주는 플랫폼입니다. 게시물 작성부터 스케줄링,
                분석까지, 소셜 미디어 마케팅의 모든 것을 한 곳에서.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href="https://socflow.app"
                  target="_blank"
                  size="lg"
                  className="group relative transform overflow-hidden bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/50 transition-transform hover:scale-105 hover:from-violet-700 hover:to-purple-700"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    무료로 시작하기
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  href="https://docs.socflow.app"
                  variant="secondary"
                  target="_blank"
                  size="lg"
                  className="group"
                >
                  <span className="flex items-center gap-2">
                    문서 보기
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </AnimatedSection>

            {/* Floating Elements */}
            <div className="animate-float absolute top-20 left-10 hidden opacity-20 lg:block">
              <SparkleIcon className="h-8 w-8 text-violet-400" />
            </div>
            <div className="animate-float-delayed absolute top-40 right-20 hidden opacity-20 lg:block">
              <SparkleIcon className="h-6 w-6 text-purple-400" />
            </div>
            <div className="animate-float-delayed-2 absolute bottom-20 left-20 hidden opacity-20 lg:block">
              <SparkleIcon className="h-10 w-10 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-32 bg-linear-to-b from-zinc-50 to-white py-16 sm:py-24 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group text-center">
                  <div className="mb-4 transform text-5xl transition-transform group-hover:scale-110">
                    {benefit.icon}
                  </div>
                  <div className="mb-2 bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
                    <CounterAnimation end={benefit.stat} />
                  </div>
                  <div className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {benefit.statLabel}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {benefit.title}
                  </h3>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="mt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-linear-to-br from-zinc-50 via-violet-50/30 to-zinc-100 p-8 sm:p-16 dark:border-zinc-700/60 dark:from-zinc-800 dark:via-violet-900/10 dark:to-zinc-900">
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-violet-500/10 to-purple-500/10 blur-3xl" />
              <div className="relative text-center">
                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                  복잡한 소셜 미디어 관리,
                  <br />
                  <span className="text-violet-600 dark:text-violet-400">
                    이제 끝내세요
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                  여러 소셜 네트워크 계정을 각각 관리하는 건 비효율적입니다.
                  Instagram에 올리고, Twitter에도 올리고, Facebook도 확인하고...
                  이런 반복적인 작업에 시간을 낭비하고 계신가요?
                </p>
                <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    SocFlow
                  </strong>
                  는 이 모든 것을 한 곳에서 처리할 수 있게 해줍니다. 한 번의
                  작성으로 모든 플랫폼에 동시에 게시하고, 스케줄링으로 시간을
                  절약하며, 통합 분석으로 인사이트를 얻으세요.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                SocFlow의 핵심 기능
              </h2>
              <p className="mt-4 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                소셜 미디어 마케팅에 필요한 모든 도구를 한 곳에서
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/20 dark:border-zinc-700/60 dark:bg-zinc-800">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />
                  <div
                    className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${feature.gradient} transform shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {feature.name}
                  </h3>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="mt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-violet-600 via-purple-600 to-indigo-600 px-8 py-20 sm:px-12 sm:py-24">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
            <AnimatedSection>
              <div className="relative mb-12 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  누구를 위한 플랫폼인가요?
                </h2>
              </div>
            </AnimatedSection>

            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl">
                    <div className="mb-4 transform text-4xl transition-transform group-hover:scale-125 group-hover:rotate-12">
                      {useCase.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-base leading-7 text-violet-100">
                      {useCase.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-32 mb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-linear-to-br from-zinc-50 via-violet-50/50 to-white px-8 py-20 text-center dark:border-zinc-700/60 dark:from-zinc-800 dark:via-violet-900/10 dark:to-zinc-900">
              <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-violet-500/20 to-purple-500/20 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-linear-to-tl from-indigo-500/20 to-purple-500/20 blur-3xl" />
              <div className="relative">
                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                  지금 바로 시작하세요
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                  SocFlow와 함께 소셜 미디어 마케팅을 한 단계 업그레이드하세요.
                  <br />
                  무료로 시작하고, 필요에 따라 플랜을 확장하세요.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    href="https://socflow.app"
                    target="_blank"
                    size="lg"
                    className="group relative transform overflow-hidden bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/50 transition-transform hover:scale-105 hover:from-violet-700 hover:to-purple-700"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      무료로 시작하기
                      <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
                <div className="mt-8">
                  <Link
                    href="https://docs.socflow.app"
                    target="_blank"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    API 문서 보기
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  )
}
