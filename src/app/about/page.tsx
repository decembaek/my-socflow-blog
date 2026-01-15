import { type Metadata } from 'next'

import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'SocFlow 소개',
  description:
    '소셜 계정을 한곳에서 관리하는 SocFlow. 게시물 관리부터 자동화까지, 소셜 미디어 마케팅을 한 단계 업그레이드하세요.',
}

export default function About() {
  return <AboutClient />
}
