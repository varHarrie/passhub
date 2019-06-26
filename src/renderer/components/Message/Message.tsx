import { useEffect, useRef } from 'react'

import Icon from '../Icon'
import { styled } from '../../styles'
import { IconType } from '../../models/base'
import { noop } from '../../libs/utils'

export interface Props {
  visible?: boolean
  duration?: number
  icon: IconType
  children?: React.ReactNode
  onHide?: () => void
  onHidden?: () => void
}

export default function Message (props: Props) {
  const { visible = true, duration, icon, children, onHide = noop, onHidden = noop } = props

  const refStayTimer = useRef<number>()
  const refHideTimer = useRef<number>()

  useEffect(() => {
    if (duration) {
      refStayTimer.current = setTimeout(() => {
        onHide()
      }, duration)
    }
  }, [])

  useEffect(() => {
    if (visible) {
      clearTimeout(refHideTimer.current)
    } else if (duration) {
      refHideTimer.current = setTimeout(() => {
        onHidden()
      }, 300)
    }
  }, [visible])

  return (
    <Wrapper visible={visible}>
      <Icon type={icon} />
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
  margin-top: ${(p) => (p.visible ? '12px' : 0)};
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: ${(p) => (p.visible ? '32px' : 0)};
  line-height: ${(p) => (p.visible ? '32px' : 0)};
  opacity: ${(p) => (p.visible ? 1 : 0)};
  background: ${(p) => p.theme.message.background};
  border-radius: ${(p) => p.theme.message.borderRadius};
  box-shadow: ${(p) => p.theme.message.shadow};
  transition: all 0.3s;
`

const Content = styled.div`
  margin-left: 8px;
  flex: 1;
  min-width: 0;
  color: #525a5b;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
