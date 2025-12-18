import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  // LinkedInIcon,
  // XIcon,
} from '@/components/SocialIcons'
// import portraitImage from '@/images/portrait.jpg'
import portraitImage from '@/images/photos/jeju-sea.jpeg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    '저는 Decembaek입니다. 상상력을 도와주는 제주도에서 살고 있습니다.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Decembaek's portrait"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            저는 Decembaek입니다. 상상력을 도와주는 제주도에서 살고 있습니다.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              모험을 좋아했습니다. 그저 종이로 된 장난감 (해적선이나 종이 망원경
              같은 것들) 으로 여행을 떠나곤 했지요. 부모님이 과학상자 6호를
              사주셨을 때는, 설명서를 끝까지 보지 않아도 스스로 조립할 수
              있었습니다.
            </p>
            <p>
              그때는 몰랐지만, 무언가를 손으로 만들고 작동하게 만드는 과정
              자체가 즐거웠던 것 같습니다. 완성도가 중요하다기보다는, 실패하고
              다시 고치면서 “왜 안 될까?”를 생각하는 시간이 좋았습니다.
            </p>
            <p>
              시간이 지나 종이 장난감은 키보드와 화면으로 바뀌었고, 여행은 실제
              장소 대신 코드와 아이디어 속에서 이루어지기 시작했습니다. 하지만
              무언가를 만들고, 직접 부딪혀 보며 배우는 방식은 크게 달라지지
              않았습니다.
            </p>
            <p>
              지금의 저는 여전히 새로운 것을 만들고 있습니다. 형태는 달라졌지만,
              어린 시절 종이 해적선을 만들던 그 마음으로 문제를 쪼개고,
              실험하고, 다시 조립하며 앞으로 나아가고 있습니다.
            </p>
            <p>
              어쩌면 저는 아직도 여행 중인지도 모르겠습니다. 다만 이제는 종이
              망원경 대신, 조금 더 현실적인 도구를 들고 있을 뿐입니다.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {/* <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink> */}
            <SocialLink
              href="https://www.instagram.com/_decembaek"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/decembaek"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            {/* <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink> */}
            <SocialLink
              href="mailto:tmdrbpp123@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              tmdrbpp123@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
