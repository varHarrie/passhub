import { forwardRef, useImperativeHandle, useRef } from 'react'

import ScrollArea, { Handles as ScrollAreaHandles } from '../ScrollArea'
import { styled } from '../../styles'

export interface Props {
  className?: string
  header?: React.ReactNode
  children?: React.ReactNode
}

export interface Handles {
  scrollToEnd: () => void
}

function SideBar (props: Props, ref: React.Ref<Handles>) {
  const { className, header, children } = props
  const refContainer = useRef<ScrollAreaHandles>()

  useImperativeHandle(ref, () => ({
    scrollToEnd: () => {
      refContainer.current.scrollToEnd()
    }
  }))

  return (
    <Wrapper className={className}>
      <Header>{header}</Header>
      <Container ref={refContainer}>{children}</Container>
    </Wrapper>
  )
}

export default forwardRef(SideBar)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(p) => p.theme.sidebar.background};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 14px;
  height: 56px;
  font-size: 20px;
  -webkit-app-region: drag;
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
