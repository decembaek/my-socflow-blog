import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description:
    'Software I use, gadgets I love, and other things I recommend. 사용하는 소프트웨어, 좋아하는 기술, 그리고 추천하는 다른 것',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="사용하는 소프트웨어, 좋아하는 기술, 그리고 추천하는 다른 것"
      intro="소프트웨어를 만들거나 생산성을 유지하기 위해 어떤 도구를 쓰는지 종종 질문을 받습니다.
가끔은 일을 미루고 있으면서도 스스로를 생산적이라고 착각하게 만들어주는 것들이죠.
여기에는 제가 애용하는 도구들을 한데 모아두었습니다."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M4 Pro, 48GB RAM">
            이전에는 인텔 기반 16인치 맥북 프로를 사용하고 있었습니다. 다만,
            엄청난 발열과 팬 소음으로 인해 불편했습니다. 이제는 M4 Pro 기반의
            14인치 맥북 프로를 사용하고 있습니다. 발열과 팬 소음이 크게
            줄어들었습니다. 성능은 말할 것도 없고요
          </Tool>
          <Tool title="로지텍 그리고 RealForce Keyboard">
            소프트웨어 작업자로서 가장 많이 쓰는 제품을 말한다면 단연코
            키보드라고 할 수 있습니다. 저는 로지텍과 리얼포스 제품을 가장
            좋아합니다.
          </Tool>
          <Tool title="로지텍 MX Master 4">
            새로 나온 MX Master 4를 즐겨 사용하고 있습니다. 햅틱 기능과 단축키
            기능에 빠져나오지 못하고 있습니다.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="vscode and Cursor">
            모든 사람들이 사용하는 여러 IDE 있지만, 저에게는 vscode와 Cursor가
            가장 좋습니다.
          </Tool>
          <Tool title="iTerm2">
            맥북에서 사용할 수 있는 가장 뛰어난 터미널 앱입니다.
          </Tool>
          <Tool title="Postman">
            API 테스트를 논할 때 빠질 수 없다고 생각합니다
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Notion">
            메모, 일정 관리 앱을 정말 많이 써봤지만 결국 Notion노션을 사용하게
            되었습니다.
          </Tool>
          <Tool title="Obsidian">
            Flow 차트를 사용하거나 아이디어를 정리할 때 단연코 최고입니다.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
