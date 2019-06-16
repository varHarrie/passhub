import { useRef } from 'react'

import useClickOutside from '../../hooks/useClickOutside'
import useToggle from '../../hooks/useToggle'
import Menu from '../Menu'
import { styled } from '../../styles'
import { MenuOption } from '../Menu/MenuItem'

export type Position = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

export interface Props<T> {
  position?: Position
  items: MenuOption<T>[]
  children: React.ReactNode
  onClick?: (e: React.MouseEvent, data: T) => void
}

export default function DropdownMenu<T> (props: Props<T>) {
  const { position = 'bottom-start', items, children, onClick } = props

  const refTrigger = useRef<HTMLElement>(null)
  const [visible, onToggle, setVisible] = useToggle()

  useClickOutside(refTrigger.current, () => {
    setVisible(false)
  })

  return (
    <Wrapper ref={refTrigger} onClick={onToggle}>
      {children}
      <StyledMenu visible={visible} style={computeStyle(position)}>
        {items.map((item, index) => (
          <Menu.Item key={index} {...item} onClick={onClick} />
        ))}
      </StyledMenu>
    </Wrapper>
  )
}

const Wrapper = styled.span`
  position: relative;
`

const StyledMenu = styled(Menu)<{ visible: boolean }>`
  position: absolute;
  margin: 8px 0;
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
