import { useCallback, useEffect, useRef, useState } from 'react'

import { styled } from '../../styles'

type ScrollState = 'normal' | 'top' | 'center' | 'bottom'

export interface Props {
  className?: string
  children?: React.ReactNode
}

export default function ScrollArea (props: Props) {
  const { className, children } = props

  const refContainer = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<ScrollState>('normal')

  const onUpdate = useCallback(() => {
    const $container = refContainer.current
    if (!$container) return

    const { scrollTop, scrollHeight, clientHeight } = $container

    setState(
      scrollHeight === clientHeight
        ? 'normal'
        : scrollTop === 0
        ? 'top'
        : scrollTop < scrollHeight - clientHeight
        ? 'center'
        : 'bottom'
    )
  }, [])

  useEffect(() => {
    refContainer.current.addEventListener('scroll', onUpdate)
    window.addEventListener('reset', onUpdate)

    return () => {
      refContainer.current.removeEventListener('scroll', onUpdate)
      window.removeEventListener('resize', onUpdate)
    }
  }, [])

  return (
    <Wrapper className={className}>
      <TopShadow visible={state === 'center' || state === 'bottom'} />
      <Container ref={refContainer}>{children}</Container>
      <BottomShadow visible={state === 'center' || state === 'top'} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

const TopShadow = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(p) => (p.visible ? '6px' : 0)};
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
  transition: height 0.3s;
`

const BottomShadow = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(p) => (p.visible ? '6px' : 0)};
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
  transition: height 0.3s;
`

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`
