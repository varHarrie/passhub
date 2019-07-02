import { cloneElement, isValidElement, useCallback, useRef } from 'react'

import useClickOutside from '../../hooks/useClickOutside'
import useToggle from '../../hooks/useToggle'
import { styled } from '../../styles'

export type Position = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

export interface Props {
  position?: Position
  content: React.ReactNode
  children: React.ReactNode
}

export default function Popup (props: Props) {
  const { position = 'bottom-start', content, children } = props

  const refTrigger = useRef<HTMLElement>(null)
  const [visible, toggle, setVisible] = useToggle()

  const onTargetClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      toggle()
    },
    [toggle]
  )

  const onPreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  useClickOutside(refTrigger.current, () => {
    setVisible(false)
  })

  const target = isValidElement(children) ? (
    cloneElement(children, { onClick: onTargetClick })
  ) : (
    <span onClick={onTargetClick}>{children}</span>
  )

  return (
    <Wrapper ref={refTrigger}>
      {target}
      <Content visible={visible} style={computeStyle(position)} onClick={onPreventDefault}>
        {content}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.span`
  position: relative;
`

const Content = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 1;
  margin: 8px 0;
  padding: 12px;
  background: #fff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: scaleY(${(p) => (p.visible ? 1 : 0)});
  transition: all 0.15s;
`

function computeStyle (position: Position) {
  const vertical = position.startsWith('top') ? 'bottom' : 'top'
  const horizontal = position.endsWith('start') ? 'left' : 'right'

  return {
    [vertical]: '100%',
    [horizontal]: 0,
    transformOrigin: vertical
  }
}
