import styled from 'styled-components'
import { Fragment, useEffect, useRef, useState } from 'react'

import Portal from '../Portal'

export interface Props {
  visible?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  target?: Element
  onHide?: () => void
  onHidden?: () => void
}

export default function Modal (props: Props) {
  const { visible = false, header, footer, target, children, onHide, onHidden } = props

  const refTimer = useRef(0)
  const [domVisible, setDomVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      setTimeout(() => setDomVisible(true), 0)
    } else {
      clearTimeout(refTimer.current)
      refTimer.current = setTimeout(() => {
        setDomVisible(false)
        onHidden()
      }, 500)
    }
  }, [visible, onHidden])

  const Wrapper = target ? Portal : Fragment
  const wrapperProps = target ? { target } : {}

  return (
    <Wrapper {...wrapperProps}>
      <Border visible={visible || domVisible}>
        <Mask visible={domVisible && visible} onClick={onHide} />
        <Dialog visible={domVisible && visible}>
          <CloseButton onClick={onHide}>×</CloseButton>
          {header && <Header>{header}</Header>}
          <Container>{children}</Container>
          {footer && <Footer>{footer}</Footer>}
        </Dialog>
      </Border>
    </Wrapper>
  )
}

const Border = styled.div<{ visible: boolean }>`
  display: ${(p) => (p.visible ? 'block' : 'none')};
`

const Mask = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.modal.maskBackground};
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 0.5s;
`

const Dialog = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 11;
  top: 40%;
  left: 50%;
  margin-top: ${(p) => (p.visible ? 0 : '30px')};
  max-width: 80%;
  width: ${(p) => p.theme.modal.width};
  background: ${(p) => p.theme.modal.background};
  box-shadow: ${(p) => p.theme.modal.boxShadow};
  border-radius: ${(p) => p.theme.modal.borderRadius};
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: translate(-50%, -50%) scale(${(p) => (p.visible ? 1 : 0.9)});
  transition: all 0.3s;
`

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 8px;
  font-size: 24px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #999;
  }
`

const Header = styled.div`
  padding: 12px 14px 0;
  font-size: 14px;
  color: #999;
`

const Container = styled.div`
  padding: 14px;
  font-size: 16px;
  color: #525a5b;
`

const Footer = styled.div`
  padding: 0 14px 12px;
`
