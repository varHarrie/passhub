import styled, { css } from 'styled-components'
import { useCallback, useEffect, useRef, useState } from 'react'

import ContextMenuTrigger from './ContextMenuTrigger'
import MenuContext from './MenuContext'
import Menu, { MenuOption } from '../Menu'
import { noop } from '../../libs/utils'

export interface Props<P, O> {
  options: MenuOption<O>[]
  children: React.ReactNode
  onClick?: (e: React.MouseEvent, data: O, payload: P) => void
}

export default function ContextMenu<P, O> (props: Props<P, O>) {
  const { options, children, onClick = noop } = props

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const refPayload = useRef<P>()

  const onShow = useCallback((e: React.MouseEvent, p: P) => {
    const nextPosition = { top: e.clientY, left: e.clientX }
    setVisible(false)

    requestAnimationFrame(() => {
      refPayload.current = p
      setVisible(true)
      setPosition(nextPosition)
    })
  }, [])

  const onHide = useCallback(() => {
    setVisible(false)
  }, [])

  const onItemClick = useCallback(
    (e, data) => {
      onClick(e, data, refPayload.current)
    },
    [onClick]
  )

  useEffect(() => {
    document.addEventListener('click', onHide)
    document.addEventListener('contextmenu', onHide)
    return () => {
      document.removeEventListener('click', onHide)
      document.removeEventListener('contextmenu', onHide)
    }
  }, [])

  return (
    <MenuContext.Provider value={onShow}>
      {children}
      <Wrapper visible={visible} style={position}>
        {options.map((item) => (
          <Menu.Item key={item.title} {...item} onClick={onItemClick} />
        ))}
      </Wrapper>
    </MenuContext.Provider>
  )
}

ContextMenu.Trigger = ContextMenuTrigger

const Wrapper = styled(Menu)<{ visible: boolean }>`
  position: fixed;
  z-index: 2;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;

  ${(p) =>
    p.visible &&
    css`
      opacity: 1;
      transform: scaleY(1);
      transition: opacity 0.2s, transform 0.2s;
    `}
`
