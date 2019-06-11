import { useCallback, useEffect, useMemo, useState } from 'react'

import Menu from '../components/Menu'
import { IconType } from '../models/base'
import { styled } from '../styles'

export type MenuOption<T = any> = {
  icon: IconType
  title: string
  data: T
}

export type ItemClickHandler = (data: any, payload: any) => void

export default function useContextMenu (items: MenuOption[], onItemClick: ItemClickHandler) {
  const [visible, setVisible] = useState(false)
  const [payload, setPayload] = useState<any>(null)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  const onClick = useCallback(
    (e, data) => {
      onItemClick(data, payload)
    },
    [payload, onItemClick]
  )

  const menu = useMemo(
    () => (
      <ContextMenu visible={visible} style={{ top, left }}>
        {items.map((item) => (
          <Menu.Item key={item.title} {...item} onClick={onClick} />
        ))}
      </ContextMenu>
    ),
    [visible, items, onClick]
  )

  const open = useCallback((e: React.MouseEvent, extra: any) => {
    setVisible(true)
    setPayload(extra)
    setTop(e.clientY)
    setLeft(e.clientX)
  }, [])

  const onMenuHide = useCallback(() => {
    if (visible) setVisible(false)
  }, [visible])

  useEffect(() => {
    document.addEventListener('click', onMenuHide)

    return () => {
      document.removeEventListener('click', onMenuHide)
    }
  }, [onMenuHide])

  return { menu, open }
}

const ContextMenu = styled(Menu)<{ visible: boolean }>`
  position: fixed;
  z-index: 2;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: scaleY(${(p) => (p.visible ? 1 : 0)});
  transform-origin: top;
  transition: opacity 0.2s, transform 0.2s;
`
